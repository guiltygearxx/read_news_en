package com.azsolutions.service.crawler

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.ImageSize
import com.azsolutions.domain.Image
import com.azsolutions.domain.LowImageSizeNews
import grails.gorm.transactions.Transactional
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.select.Elements

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class ImageCrawlerService {

    public static int MAX_SCANNED_NEWS_LIST_SIZE;
    public static int MAX_SCANNED_TIMES;
    public static int MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;
    public static int THREAD_POOL_SIZE;

    public static final String SCAN_STATUS_NEW = "new";
    public static final String SCAN_STATUS_DONE = "done";
    public static final String SCAN_STATUS_FAIL = "fail";

    def jsoupUtilsService;
    def imageUtilsService;
    def applicationUtilsService;

    void crawl(Date fromDate_, Date toDate_) {

        Date now = new Date();

        applicationUtilsService.scan(
                fromDate_, toDate_, MAX_SCANNED_PERIOD_RANGE_IN_MINUTES, MAX_SCANNED_TIMES,

                { Date fromDate, Date toDate, Integer scannedTimes ->

                    Image.withSession { def session ->

                        List<LowImageSizeNews> lowImageSizeNewsList;

                        while (lowImageSizeNewsList = this.getLowImageSizeNewsList(fromDate, toDate, scannedTimes, MAX_SCANNED_NEWS_LIST_SIZE)) {

                            this.crawlImages(lowImageSizeNewsList, now);

                            session.flush();

                            session.clear();
                        }
                    }
                }
        )
    }

    private List<LowImageSizeNews> getLowImageSizeNewsList(Date fromDate, Date toDate, Integer scannedTimes, Integer max) {

        return LowImageSizeNews.createCriteria().list([max: max], {

            ne("scanStatus", SCAN_STATUS_DONE);
            eq("scannedTimes", scannedTimes);
            ge("createdTime", fromDate);
            lt("createdTime", toDate);

            order("createdTime", "desc");
        });
    }

    private void crawlImages(List<LowImageSizeNews> newsList, Date now) {

        if (!newsList) return;

        List<Image> images = newsList ? Image.findAllByIsDeletedAndReferenceIdInList(false, newsList.id) : [];

        Map imageMapByReferenceId = images?.groupBy { it.referenceId };

        ExecutorService threadPool = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

        List<Image> scannedImages = [];

        try {

            List<Future> futures = newsList?.collect { LowImageSizeNews lowImageSizeNews ->

                threadPool.submit({

                    String scanStatus_;

                    try {

                        Image scannedImage = crawlImages_(lowImageSizeNews, imageMapByReferenceId.get(lowImageSizeNews.id), now);

                        if (scannedImage) scannedImages << scannedImage;

                        scanStatus_ = SCAN_STATUS_DONE;

                    } catch (Exception ex) {

                        println "ImageCrawlerService.crawlImages: error| news.id=${lowImageSizeNews.id} | error=${ex.message}";

                        ex.printStackTrace();

                        scanStatus_ = SCAN_STATUS_FAIL;

                    } finally {

                        lowImageSizeNews.with {

                            scannedTimes++;
                            lastModifiedTime = now;
                            scanStatus = scanStatus_;
                        }
                    }

                } as Callable);
            }

            futures.each { it.get() };

            newsList.each { it.save() };

            scannedImages.each { it.save() };

        } finally {

            threadPool.shutdown();
        }
    }

    private Image crawlImages_(LowImageSizeNews news, List<Image> images, Date now) {

        Document document = this.jsoupUtilsService.toDocumentFromUrl(news.link);

        String url = document.select("meta[property=og:image]")?.attr("content")?.trim();

        Image existedImage = images?.findAll { it.url == url };

        if (existedImage) return null;

        String widthStr = document.select("meta[property=og:image:width]")?.attr("content")?.trim();

        Integer width = (widthStr ?: null)?.toInteger();

        String heightStr = document.select("meta[property=og:image:height]")?.attr("content")?.trim();

        Integer height = (heightStr ?: null)?.toInteger();

        if (!width || !height) {

            ImageSize size = imageUtilsService.detectImageSize(url);

            width = size.width;
            height = size.height;
        }

        Image image = new Image(
                url: url, width: width, height: height, referenceId: news.id,
                referenceType: ApplicationConstant.IMAGE_REFERENCE_TYPE_NEWS,
                lastModifiedTime: now, lastModifiedUser: "system", isDeleted: "false"
        );

        return image;
    }

    public static void main(String[] args) {

        String url = "https://vtc.vn/van-phu--invest-duoc-vinh-danh-la-nha-phat-trien-bat-dong-san-tot-nhat-ha-noi-d416100.html";

        Document node = Jsoup.parse(url.toURL(), 10000);

        Elements element1 = node.select("meta[property=og:image]");

        println element1.attr("content");
    }
}
