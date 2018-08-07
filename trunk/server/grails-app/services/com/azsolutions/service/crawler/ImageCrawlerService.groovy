package com.azsolutions.service.crawler

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.ImageSize
import com.azsolutions.domain.Image
import com.azsolutions.domain.LowImageSizeNews
import com.azsolutions.domain.News
import grails.gorm.transactions.Transactional
import groovy.time.TimeCategory
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.select.Elements

@Transactional
class ImageCrawlerService {

    public static final int MAX_SCANNED_NEWS_LIST_SIZE = 100;
    public static final int MAX_SCANNED_TIMES = 5;
    public static final int MAX_SCANNED_RANGE_IN_DATE = 5;
    public static final int MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = 5;
    public static final int DELAY_TIME_IN_MINUTES = 5;

    public static final String SCAN_STATUS_NEW = "new";
    public static final String SCAN_STATUS_DONE = "done";
    public static final String SCAN_STATUS_FAIL = "fail";

    def jsoupUtilsService;

    def imageUtilsService;

    void crawl(Date fromDate_, Date toDate_, Integer scanPeriodRangeInMinutes) {

        Date now = new Date();

        Date fromDate;

        Date toDate;

        use(TimeCategory) {

            (!toDate_) && (toDate_ = now - DELAY_TIME_IN_MINUTES.minutes);

            fromDate = fromDate_ ?: (toDate_ - MAX_SCANNED_RANGE_IN_DATE.days);
        }

        (!scanPeriodRangeInMinutes) && (scanPeriodRangeInMinutes = MAX_SCANNED_PERIOD_RANGE_IN_MINUTES);

        while (fromDate < toDate_) {

            use(TimeCategory) { toDate = [fromDate + scanPeriodRangeInMinutes.minutes, toDate_].min() }

            Image.withSession { def session ->

                List<LowImageSizeNews> lowImageSizeNewsList;

                while (lowImageSizeNewsList = this.getLowImageSizeNewsList(fromDate, toDate, MAX_SCANNED_TIMES, MAX_SCANNED_NEWS_LIST_SIZE)) {

                    this.crawlImages(lowImageSizeNewsList, now);

                    session.flush();

                    session.clear();
                }
            }

            fromDate = toDate;
        }
    }

    private List<LowImageSizeNews> getLowImageSizeNewsList(Date fromDate, Date toDate, Integer maxScannedTimes, Integer max) {

        LowImageSizeNews.createCriteria().list([max: max], {

            or {
                eq("scanStatus", SCAN_STATUS_NEW);
                and {
                    eq("scanStatus", SCAN_STATUS_FAIL);
                    lt("scannedTimes", maxScannedTimes);
                }
            }

            lt("createdTime", toDate);
            ge("createdTime", fromDate);

            order("createdTime", "desc");
        });
    }

    private void crawlImages(List<LowImageSizeNews> newsList, Date now) {

        if (!newsList) return;

        List<Image> images = newsList ? Image.findAllByIsDeletedAndReferenceIdInList(newsList.id) : [];

        Map imageMapByReferenceId = images?.groupBy { it.referenceId };

        newsList?.each { LowImageSizeNews lowImageSizeNews ->

            String scanStatus_;

            try {

                crawlImages_(imageMapByReferenceId.get(lowImageSizeNews.id), now)?.save();

                scanStatus_ = SCAN_STATUS_DONE;

            } catch (Exception ex) {

                println "ImageCrawlerService.crawlImages: error| news.id=${lowImageSizeNews.id}";

                ex.printStackTrace();

                scanStatus_ = SCAN_STATUS_FAIL;

            } finally {

                lowImageSizeNews.with {

                    scannedTimes++;
                    lastModifiedTime = now;
                    scanStatus = scanStatus_;

                    save();
                }
            }
        }

    }

    private Image crawlImages_(News news, List<Image> images, Date now) {

        Document document = this.jsoupUtilsService.toDocumentFromUrl(news.link);

        String url = document.select("meta[property=og:image]")?.attr("content")?.trim();

        Image existedImage = images?.findAll { it.url == url };

        if (existedImage) return null;

        Integer width = document.select("meta[property=og:image:width]")?.attr("content")?.trim()?.toInteger();

        Integer height = document.select("meta[property=og:image:height]")?.attr("content")?.trim()?.toInteger();

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
