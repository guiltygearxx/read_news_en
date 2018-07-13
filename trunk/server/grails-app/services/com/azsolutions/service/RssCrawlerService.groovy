package com.azsolutions.service

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.Rss
import com.azsolutions.domain.*
import grails.converters.JSON
import grails.gorm.transactions.Transactional

import java.util.concurrent.Callable
import java.util.concurrent.Executor
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future

@Transactional
class RssCrawlerService {

    public static final int READ_RSS_THREAD_POOL_SIZE = 10;

    def readRssService;
    def applicationUtilsService;

    void crawler() {

        Date now = new Date();

        ExecutorService threadPool = Executors.newFixedThreadPool(READ_RSS_THREAD_POOL_SIZE);

        try {

            List<Future> futures = [];

            RssSourceGroup
//                    .findAllByIsDeleted(false)
                    .findAllByIdInList(["adcea372-17dd-4249-8e64-94322d6aba96"])
                    .each { RssSourceGroup rssSourceGroup ->

                List<RssSource> rssSources =
                        RssSource.findAllByIsDeletedAndRssSourceGroupId(false, rssSourceGroup.id)

                List<String> rssSourceIds = rssSources.id;

                if (!rssSourceIds) return;

                List<RssConfig> rssConfigs =
                        RssConfig.findAllByIsDeletedAndRssSourceIdInList(false, rssSourceIds);

                futures << threadPool.submit({ ->

                    RssConfig.withNewSession {
                        this.crawler_(now, rssSources, rssConfigs);
                    }

                } as Callable);
            }

            futures.each { it.get() };

        } finally {

            threadPool.shutdown();
        }
    }

    private void crawler_(Date now, List<RssSource> rssSources, List<RssConfig> rssConfigs) {

        rssConfigs.each { RssConfig rssConfig ->

            try {

                List<String> checkedGuids = [];

                Rss rss = readRssService.readRss(rssConfig);

                RssSource rssSource = rssSources.find { it.id == rssConfig.rssSourceId };

                List<String> guidList = rss?.items?.guid;

                List<News> existNewsList = guidList ? News.findAllByIsDeletedAndGuidInList(false, guidList) : null;

                List<News> crawledNewsList = [];

                rss?.items.each { Rss.Item item ->

                    if (checkedGuids.contains(item.guid)) return;

                    checkedGuids << item.guid;

                    News news = existNewsList?.find { it.guid == item.guid };

                    /**
                     * neu news da duoc dong bo thi khong dong bo nua;
                     */
                    if (news) return (crawledNewsList << news);

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

                    return (crawledNewsList << news);
                }

                if (crawledNewsList) {

                    /**
                     * cache lai list de khong phai query nhieu lan vao db;
                     */
                    List<NewsRssSource> newsRssSources = NewsRssSource.findAllByIsDeletedAndNewsIdInListAndRssSourceId(
                            false, crawledNewsList.id, rssSource.id
                    );

                    crawledNewsList.each { News news ->

                        NewsRssSource existNewsRssSource =
                                newsRssSources?.find { it.rssSourceId == rssSource.id && it.newsId == news.id }

                        if (existNewsRssSource) return;

                        NewsRssSource newsRssSource = new NewsRssSource(
                                rssSourceId: rssSource.id, newsId: news.id,
                                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                        );

                        newsRssSource.save(flush: true);
                    }

                    /**
                     * cache lai list de khong phai query nhieu lan vao db;
                     */
                    List<CategoryNews> categoryNewsList = CategoryNews.findAllByIsDeletedAndNewsIdInListAndCategoryId(
                            false, crawledNewsList.id, rssSource.categoryId
                    )

                    crawledNewsList.each { News news ->

                        CategoryNews existCategoryNews =
                                categoryNewsList?.find {
                                    it.categoryId == rssSource.categoryId && it.newsId == news.id
                                }

                        if (existCategoryNews) return;

                        CategoryNews categoryNews = new CategoryNews(
                                categoryId: rssSource.categoryId, newsId: news.id,
                                isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                        );

                        categoryNews.save(flush: true);
                    }
                }
            } catch (Exception ex) {

                println "RssCrawlerService.crawler: error| rssConfig.id=${rssConfig.id}";

                ex.printStackTrace();
            }
        }
    }
}
