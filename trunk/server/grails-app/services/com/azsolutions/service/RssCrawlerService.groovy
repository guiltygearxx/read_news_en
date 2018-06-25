package com.azsolutions.service

import com.azsolutions.bean.Rss
import com.azsolutions.domain.CategoryNews
import com.azsolutions.domain.Image
import com.azsolutions.domain.News
import com.azsolutions.domain.NewsRssSource
import com.azsolutions.domain.RssConfig
import com.azsolutions.domain.RssSource
import grails.gorm.transactions.Transactional

@Transactional
class RssCrawlerService {

    def readRssService;
    def applicationUtilsService;

    def crawler() {

        Date now = new Date();

        List<RssConfig> rssConfigs = RssConfig.findAllByIsDeleted(false);

        List<RssSource> rssSources =
                rssConfigs ? RssSource.findAllByIsDeletedAndIdInList(false, rssConfigs.rssSourceId) : null;

        rssConfigs.each { RssConfig rssConfig ->

            Rss rss = readRssService.readRss(rssConfig);

            RssSource rssSource = rssSources.find { it.id == rssConfig.rssSourceId };

            List<String> guidList = rss?.items?.guid;

            List<News> existNewsList =
                    guidList ? News.findAllByIsDeletedAndGuidInList(false, guidList) : null;

            List<News> crawledNewsList = rss?.items.collect { Rss.Item item ->

                News news = existNewsList?.find { it.guid == item.guid };

                /**
                 * neu news da duoc dong bo thi khong dong bo nua;
                 */
                if (news) return news;

                news = new News(
                        title: item.title, link: item.link,
                        pubDate: applicationUtilsService.parseRssDate(item.pubDate),
                        guid: item.guid, description: item.description, rssSourceId: rssConfig.rssSourceId,
                        isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                );

                news.save();

                item?.thumbnails.each { Rss.Thumbnail thumbnail ->

                    Image image = new Image(
                            type: thumbnail.type, width: thumbnail.width, height: thumbnail.height,
                            url: thumbnail.url, referenceId: news.id, referenceType: "NEWS",
                            isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                    );

                    image.save();
                }

                return news;
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

                    newsRssSource.save();
                }

                /**
                 * cache lai list de khong phai query nhieu lan vao db;
                 */
                List<CategoryNews> categoryNewsList = CategoryNews.findAllByIsDeletedAndNewsIdInListAndCategoryId(
                        false, crawledNewsList.id, rssSource.categoryId
                )

                crawledNewsList.each { News news ->

                    CategoryNews existCategoryNews =
                            categoryNewsList?.find { it.categoryId == rssSource.categoryId && it.newsId == news.id }

                    if (existCategoryNews) return;

                    CategoryNews categoryNews = new CategoryNews(
                            categoryId: rssSource.categoryId, newsId: news.id,
                            isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                    );

                    categoryNews.save();
                }
            }
        }
    }
}
