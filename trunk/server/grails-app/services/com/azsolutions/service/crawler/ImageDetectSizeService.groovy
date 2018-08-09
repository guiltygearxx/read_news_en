package com.azsolutions.service.crawler

import com.azsolutions.bean.ImageSize
import com.azsolutions.domain.Image
import com.azsolutions.domain.MissingSizeImage
import grails.gorm.transactions.Transactional

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class ImageDetectSizeService {

    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_DONE = 'done';
    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_ERROR = 'error';
    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_NEW = 'new';

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
    private List<MissingSizeImage> getMissingSizeImages(Integer max, Date fromDate, Date toDate, Integer scannedTimes) {

        return MissingSizeImage.createCriteria().list([max: max], {

            eq("scanStatus", MISSING_IMAGE_SIZE_SCAN_STATUS_NEW);
            eq("scannedTimes", scannedTimes);
            ge("createdTime", fromDate);
            lt("createdTime", toDate);

            order("createdTime", "desc");
        });
    }

    private List<Image> getImages(List<MissingSizeImage> missingSizeImageList) {

        return !missingSizeImageList ? null : Image.createCriteria().list {

            inList("id", missingSizeImageList.id);
            eq("isDeleted", false);
            or {
                isNull("width");
                isNull("height");
            }
        }
    }

    void detect(Date fromDate_, Date toDate_, Integer maxScannedTimes) {

        List<Image> images;

        List<MissingSizeImage> missingSizeImages;

        Date now = new Date();

        applicationUtilsService.scan(
                fromDate_, toDate_, MAX_SCANNED_PERIOD_RANGE_IN_MINUTES, maxScannedTimes,
                { Date fromDate, Date toDate, Integer scannedTimes_ ->

                    while (missingSizeImages = this.getMissingSizeImages(MAX_SCANNED_NEWS_LIST_SIZE, fromDate, toDate, scannedTimes_)) {

                        images = this.getImages(missingSizeImages);

                        if (images) {

                            ExecutorService threadPool = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

                            List<Future> futures = images.collect { Image image ->

                                MissingSizeImage missingSizeImage = MissingSizeImage.get(image.id);

                                threadPool.submit({ ->

                                    String scanStatus_;

                                    try {

                                        ImageSize size_ = imageUtilsService.detectImageSize(image.url);

                                        if (size_) image.with {

                                            height = size_.height;
                                            width = size_.width;
                                            lastModifiedTime = now;
                                            lastModifiedUser = 'system';
                                        }

                                        scanStatus_ = MISSING_IMAGE_SIZE_SCAN_STATUS_DONE;

                                    } catch (FileNotFoundException e) {

                                        image.with {

                                            isDeleted = false;
                                            lastModifiedTime = now;
                                            lastModifiedUser = 'system';
                                        }

                                        scanStatus_ = MISSING_IMAGE_SIZE_SCAN_STATUS_DONE;

                                    } catch (Exception e) {

                                        println "ImageDetectSizeService.detect: error: image.id=${image.id}";

                                        e.printStackTrace();

                                        scanStatus_ = MISSING_IMAGE_SIZE_SCAN_STATUS_ERROR;

                                    } finally {

                                        missingSizeImage.with {

                                            scannedTimes++;
                                            scanStatus = scanStatus_;
                                            lastModifiedTime = now;
                                        }
                                    }

                                } as Callable);
                            }

                            futures.each { it.get() };
                        }

                        missingSizeImages.each {
                            if (it.scanStatus == MISSING_IMAGE_SIZE_SCAN_STATUS_NEW) {

                                it.scanStatus = MISSING_IMAGE_SIZE_SCAN_STATUS_DONE;
                                it.scannedTimes++;
                            };
                        };

                        Image.withSession { def session ->

                            missingSizeImages.each { it.save() };

                            images?.each { it.save() };

                            session.flush();

                            session.clear();
                        }
                    }
                })
    }
}
