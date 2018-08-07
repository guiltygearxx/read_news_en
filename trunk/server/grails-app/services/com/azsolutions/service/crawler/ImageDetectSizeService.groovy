package com.azsolutions.service.crawler

import com.azsolutions.bean.ImageSize
import com.azsolutions.domain.Image
import grails.gorm.transactions.Transactional

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class ImageDetectSizeService {

    public static final int MAX_SCANNED_NEWS_LIST_SIZE = 100;
    public static final int MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = 5;
    public static final int THREAD_POOL_SIZE = 10;

    def imageUtilsService;
    def applicationUtilsService;

    /**
     *
     * @param max
     * @param fromDate
     * @param toDate
     * @return
     */
    private List<Image> getMissingSizeImages(Integer max, Date fromDate, Date toDate) {

        return Image.createCriteria().list([max: max], {

            or {
                isNull("width");
                isNull("height");
            }

            eq("isDeleted", false);
            ge("createdTime", fromDate);
            lt("createdTime", toDate);

            order("createdTime", "desc");
        });
    }

    void detect(Date fromDate_, Date toDate_) {

        List<Image> images;

        Date now = new Date();

        applicationUtilsService.scan(fromDate_, toDate_, MAX_SCANNED_PERIOD_RANGE_IN_MINUTES, { Date fromDate, Date toDate ->

            while (images = this.getMissingSizeImages(MAX_SCANNED_NEWS_LIST_SIZE, fromDate, toDate)) {

                println images.size();

                ExecutorService threadPool = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

                List<Future> futures = images.collect { Image image ->

                    threadPool.submit({ ->

                        try {

                            ImageSize size_ = imageUtilsService.detectImageSize(image.url);

                            if (size_) image.with {

                                height = size_.height;
                                width = size_.width;
                                lastModifiedTime = now;
                                lastModifiedUser = 'system';
                            }

                        } catch (FileNotFoundException e) {

                            image.with {

                                isDeleted = false;
                                lastModifiedTime = now;
                                lastModifiedUser = 'system';
                            }
                        } catch (Exception e) {

                            println "ImageDetectSizeService.detect: error: image.id=${image.id}";

                            e.printStackTrace();
                        }

                    } as Callable);
                }

                futures.each { it.get() };

                Image.withSession { def session ->

                    images.each {

                        it.save()
                    };

                    session.flush();

                    session.clear();
                }
            }
        })
    }
}
