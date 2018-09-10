package com.azsolutions.service.crawler

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.Rss
import com.azsolutions.domain.*
import com.azsolutions.service.RssReaderEventHandler
import grails.gorm.transactions.Transactional

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class RssCrawlerService {

    public static int READ_RSS_THREAD_POOL_SIZE;

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

                    Long start_ = new Date().time;

                    println "RssCrawlerService.crawler_: start| rssSourceGroup.id=${rssSourceGroup.id}";

                    this.crawler_(now, rssConfigs);

                    println "RssCrawlerService.crawler_: end| rssSourceGroup.id=${rssSourceGroup.id} | duration= ${new Date().time - start_}";

                } as Callable);

            }

            futures.each { it.get() };

        } finally {

            threadPool.shutdown();
        }
    }

    private NewsRssSource saveNewsRssSource(RssSource rssSource, News news, Date now) {

        NewsRssSource newsRssSource =
                NewsRssSource.findByNewsIdAndRssSourceIdAndIsDeleted(news.id, rssSource.id, false);

        if (!newsRssSource) {

            newsRssSource = new NewsRssSource(
                    rssSourceId: rssSource.id, newsId: news.id,
                    isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
            );

            newsRssSource.save();
        }

        return newsRssSource;
    }

    private CategoryNews saveCategoryNews(RssSource rssSource, News news, Date now) {

        CategoryNews categoryNews =
                CategoryNews.findByNewsIdAndCategoryIdAndIsDeleted(news.id, rssSource.categoryId, false);

        if (!categoryNews) {

            categoryNews = new CategoryNews(
                    categoryId: rssSource.categoryId, newsId: news.id,
                    isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
            );

            categoryNews.save();
        }

        return categoryNews;
    }

    private News saveNews(RssConfig rssConfig, RssSource rssSource, Rss.Item item, Date now) {

        def pubDate = applicationUtilsService.parseRssDate(
                item.pubDate, rssConfig.dateFormat, rssConfig.timeZone
        );

        News news = new News(
                title: item.title, link: item.link,
                pubDate: pubDate,
                guid: item.guid, description: item.description, rssSourceId: rssConfig.rssSourceId,
                rssSourceGroupId: rssSource.rssSourceGroupId,
                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now,
        );

        news.save();

        return news;
    }

    private Image saveImage(Rss.Thumbnail thumbnail, News news, Date now) {

        Image image = new Image(
                type: thumbnail.type, width: thumbnail.width, height: thumbnail.height,
                url: thumbnail.url, referenceId: news.id,
                referenceType: ApplicationConstant.IMAGE_REFERENCE_TYPE_NEWS,
                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
        );

        image.save();

        return image;
    }

    private void crawler_(Date now, List<RssConfig> rssConfigs) {

        rssConfigs.each { RssConfig rssConfig ->

            Long start_ = new Date().time;

            println "RssCrawlerService.crawler_: start| rssConfig.id=${rssConfig.id}";

            RssConfig.withNewSession { def session ->

                try {

                    List<String> checkedGuids = [];

                    RssSource rssSource = rssSourceService.findRssSourceById(rssConfig.rssSourceId);

                    News news;

                    Boolean isExistedNews = false;

                    readRssService.readRss(rssConfig, new RssReaderEventHandler() {

                        @Override
                        void handleEvent(Map<String, Object> context, String mappingPath) {

                            switch (mappingPath) {

                                case "root.items":

                                    Rss.Item item = context.get("item");

                                    if (checkedGuids.contains(item.guid)) break;

                                    checkedGuids << item.guid;

                                    isExistedNews = (news = News.findByGuidAndIsDeleted(item.guid, false)) ? true : false;

                                    (!news) && (news = saveNews(rssConfig, rssSource, item, now));

                                    saveNewsRssSource(rssSource, news, now);

                                    saveCategoryNews(rssSource, news, now);

                                    break;

                                case "root.items.thumbnails":

                                    if (isExistedNews) break;

                                    Rss.Thumbnail thumbnail = context.get("thumbnail");

                                    saveImage(thumbnail, news, now);

                                    break;
                            }
                        }
                    });

                } catch (Exception ex) {

                    println "RssCrawlerService.crawler: error| rssConfig.id=${rssConfig.id}";

                    println ex.getMessage();

                    ex.printStackTrace();
                }

                session.flush();

                session.clear();
            }

            println "RssCrawlerService.crawler_: end| rssConfig.id=${rssConfig.id} | duration= ${new Date().time - start_}";
        }
    }
}
