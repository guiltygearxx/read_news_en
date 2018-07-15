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
                    .findAllByIdInList(["0dbdc216-d4e2-4fbd-8637-4601847bdf6d", "148359d0-a2b4-40a0-aed6-f81c0b8468db",
                                        "1d71f736-8294-4f47-a407-defd60c8d57b", "35f8f475-f4c6-4e86-92d9-ab451654fbf6",
                                        "513e4ec1-7b17-4f32-9ce7-754021de1bff", "52dc5458-20c0-4732-beab-fec7b5820e63",
                                        "c73f98f2-3012-4151-90e8-ad894ee1378d", "e0d43eef-18ad-47b3-8dbd-7413ba9fca23"])
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
