package com.azsolutions.service.crawler

import com.azsolutions.domain.MissingContentNews
import com.azsolutions.domain.News
import com.azsolutions.domain.NewsContent
import grails.gorm.transactions.Transactional
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class NewsContentCrawlerService {

    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_DONE = 'done';
    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_ERROR = 'error';
    public static final String MISSING_IMAGE_SIZE_SCAN_STATUS_NEW = 'new';

    public static final int MAX_SCANNED_NEWS_LIST_SIZE = 100;
    public static final int MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = 5;
    public static final int THREAD_POOL_SIZE = 10;

    def applicationUtilsService;
    def jsoupUtilsService;
    def newsContentCrawlerConfigService;

    private List<MissingContentNews> getMissingContentNewsList(Integer max, Date fromDate, Date toDate, Integer scannedTimes) {

        def list = MissingContentNews.createCriteria().list([max: max], {

            ne("scanStatus", MISSING_IMAGE_SIZE_SCAN_STATUS_DONE);
            eq("scannedTimes", scannedTimes);
            ge("createdTime", fromDate);
            lt("createdTime", toDate);

            order("createdTime", "desc");
        });

        return list;
    }

    private List<News> getNews(List<MissingContentNews> missingContentNews) {

        return !missingContentNews ? null : News.findAllByIdInListAndIsDeleted(missingContentNews.id, false);
    }

    private Object runExpression(Element node, String expression) {

        return !expression ? node :
                applicationUtilsService.runExpression(expression, [node: node, utils: jsoupUtilsService]);
    }

    NewsContent crawl_(News news, def config, Date now) {

        Document doc = jsoupUtilsService.toDocumentFromUrl(news.link);

        String expression = config.expression;

        return new NewsContent(
                id: news.id, content: runExpression(doc, expression),
                lastModifiedTime: now, lastModifiedUser: 'system', isDeleted: false
        )
    }

    void crawl(Date fromDate_, Date toDate_, Integer maxScannedTimes) {

        List<News> listOfNews;

        List<MissingContentNews> missingContentNewsList;

        List<NewsContent> newsContents;

        Date now = new Date();

        applicationUtilsService.scan(
                fromDate_, toDate_, MAX_SCANNED_PERIOD_RANGE_IN_MINUTES, maxScannedTimes,
                { Date fromDate, Date toDate, Integer scannedTimes_ ->

                    while (missingContentNewsList = this.getMissingContentNewsList(MAX_SCANNED_NEWS_LIST_SIZE, fromDate, toDate, scannedTimes_)) {

                        listOfNews = this.getNews(missingContentNewsList);

                        if (listOfNews) {

                            newsContents = [];

                            ExecutorService threadPool = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

                            try {

                                List<Future> futures = listOfNews.collect { News news ->

                                    MissingContentNews missingContentNews = MissingContentNews.get(news.id);

                                    def crawlerConfig = newsContentCrawlerConfigService.getConfigJsonByRssConfigId(
                                            missingContentNews.newsContentCrawlerConfigId
                                    );

                                    threadPool.submit({ ->

                                        String scanStatus_;

                                        try {

                                            crawlerConfig && (newsContents << crawl_(news, crawlerConfig, now));

                                            scanStatus_ = MISSING_IMAGE_SIZE_SCAN_STATUS_DONE;

                                        } catch (Exception e) {

                                            scanStatus_ = MISSING_IMAGE_SIZE_SCAN_STATUS_ERROR;

                                            println "NewsContentCrawlerService.crawl: error: news.id=${news.id} | error=${e.message}";
                                        }

                                        missingContentNews.with {

                                            scannedTimes = scannedTimes + 1;
                                            scanStatus = scanStatus_;
                                            lastModifiedTime = now;
                                        }

                                        return missingContentNews;

                                    } as Callable<MissingContentNews>);
                                }

                                (missingContentNewsList - futures.collect { it.get() }).each {

                                    it.scanStatus = MISSING_IMAGE_SIZE_SCAN_STATUS_DONE;
                                    it.scannedTimes = it.scannedTimes + 1;
                                }

                            } finally {

                                threadPool.shutdown()
                            }
                        }

                        MissingContentNews.withSession { def session ->

                            missingContentNewsList.each { it.save() };

                            newsContents.each { it.save() };

                            session.flush();

                            session.clear();
                        }
                    }
                }
        );
    }
}
