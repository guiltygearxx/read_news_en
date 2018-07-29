package com.azsolutions.service

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.Rss
import com.azsolutions.domain.*
import grails.gorm.transactions.Transactional

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class RssCrawlerService {

    public static final int READ_RSS_THREAD_POOL_SIZE = 1;

    def readRssService;
    def applicationUtilsService;
    def rssSourceGroupService;
    def rssSourceService;

    void crawler() {

        Date now = new Date();

        ExecutorService threadPool = Executors.newFixedThreadPool(READ_RSS_THREAD_POOL_SIZE);

        try {

            List<Future> futures = [];

            this.rssSourceGroupService.rssSourceGroups

            this.rssSourceGroupService.rssSourceGroups.each { RssSourceGroup rssSourceGroup ->

                List<RssSource> rssSources =
                        RssSource.findAllByIsDeletedAndRssSourceGroupId(false, rssSourceGroup.id)

                List<String> rssSourceIds = rssSources.id;

                if (!rssSourceIds) return;

                List<RssConfig> rssConfigs =
                        RssConfig.findAllByIsDeletedAndRssSourceIdInList(false, rssSourceIds);

                futures << threadPool.submit({ ->

                    println "RssCrawlerService.crawler_: start| rssSourceGroup.id=${rssSourceGroup.id}";

                    RssConfig.withNewSession {
                        this.crawler_(now, rssConfigs);
                    }

                    println "RssCrawlerService.crawler_: end| rssSourceGroup.id=${rssSourceGroup.id}";

                } as Callable);

            }

            futures.each { it.get() };

        } finally {

            threadPool.shutdown();
        }
    }

    private void crawler_(Date now, List<RssConfig> rssConfigs) {

        rssConfigs.each { RssConfig rssConfig ->

            try {

                List<String> checkedGuids = [];

                Rss rss = readRssService.readRss(rssConfig);

                RssSource rssSource = rssSourceService.findRssSourceById(rssConfig.rssSourceId);

                rss?.items.each { Rss.Item item ->

                    if (checkedGuids.contains(item.guid)) return;

                    checkedGuids << item.guid;

                    News news = News.findByGuidAndIsDeleted(item.guid, false);

                    /**
                     * neu news da duoc dong bo thi khong dong bo nua;
                     */
                    if (!news) {

                        def pubDate = applicationUtilsService.parseRssDate(
                                item.pubDate, rssConfig.dateFormat, rssConfig.timeZone
                        );

                        news = new News(
                                title: item.title, link: item.link,
                                pubDate: pubDate,
                                guid: item.guid, description: item.description, rssSourceId: rssConfig.rssSourceId,
                                rssSourceGroupId: rssSource.rssSourceGroupId,
                                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now,
                        );

                        news.save(flush: true);

                        item?.thumbnails.each { Rss.Thumbnail thumbnail ->

                            Image image = new Image(
                                    type: thumbnail.type, width: thumbnail.width, height: thumbnail.height,
                                    url: thumbnail.url, referenceId: news.id,
                                    referenceType: ApplicationConstant.IMAGE_REFERENCE_TYPE_NEWS,
                                    isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                            );

                            image.save(flush: true);
                        }
                    }

                    /**
                     * luu news_rss_source;
                     */
                    NewsRssSource existNewsRssSource =
                            NewsRssSource.findByNewsIdAndRssSourceIdAndIsDeleted(news.id, rssSource.id, false);

                    if (!existNewsRssSource) {

                        NewsRssSource newsRssSource = new NewsRssSource(
                                rssSourceId: rssSource.id, newsId: news.id,
                                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                        );

                        newsRssSource.save(flush: true);
                    }

                    /**
                     * luu category_news;
                     */
                    CategoryNews existCategoryNews =
                            CategoryNews.findByNewsIdAndCategoryIdAndIsDeleted(news.id, rssSource.categoryId, false);

                    if (!existCategoryNews) {

                        CategoryNews categoryNews = new CategoryNews(
                                categoryId: rssSource.categoryId, newsId: news.id,
                                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                        );

                        categoryNews.save(flush: true);
                    }
                }

            } catch (Exception ex) {

                println "RssCrawlerService.crawler: error| rssConfig.id=${rssConfig.id}";

                println ex.getMessage();
            }
        }
    }
}
