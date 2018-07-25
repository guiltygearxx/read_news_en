package com.azsolutions.service

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.Rss
import com.azsolutions.domain.HotNews
import com.azsolutions.domain.HotNewsConfig
import com.azsolutions.domain.Image
import com.azsolutions.domain.News
import grails.converters.JSON
import grails.gorm.transactions.Transactional
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements

@Transactional
class HotNewsCrawlerService {

    def jsoupUtilsService;
    def applicationUtilsService;

    private Object runExpression(Element node, String expression) {

        return !expression ? node :
                applicationUtilsService.runExpression(expression, [node: node, utils: jsoupUtilsService]);
    }

    private Object initNewBean(String mappingPath) {

        switch (mappingPath) {

            case "root.thumbnails":
                return new Rss.Thumbnail();

            default:
                return new Rss.Item();
        }
    }

    private String getConvertType(String mappingPath) {

        switch (mappingPath) {

            case "root.thumbnails":
                return "list";

            case "root.thumbnails.height":
            case "root.thumbnails.width":
                return "integer";

            default:
                return "string";
        }
    }

    private Integer convertToInteger(String value) {

        return value ? value as Integer : null;
    }

    private Object parseHTML(Map config, Element node, String mappingPath) {

        def bean = initNewBean(mappingPath);

        config.keySet().each { String key ->

            Map propertyConfig = config[key];

            String expression = (propertyConfig["expression"] as String)?.trim();

            if (!expression) return;

            def childNodes = runExpression(node, expression);

            String convertType = getConvertType(mappingPath + "." + key);

            switch (convertType) {

                case "integer":

                    bean."${key}" = convertToInteger((childNodes as String)?.trim());

                    break;

                case "object":

                    def propertyConfig_config = propertyConfig["config"];

                    bean."${key}" = parseHTML(propertyConfig_config, childNodes, mappingPath + "." + key);

                    break;

                case "list":

                    def propertyConfig_config = propertyConfig["config"];

                    bean."${key}" = (childNodes as Elements)?.collect {

                        return parseHTML(propertyConfig_config, it, mappingPath + "." + key);
                    };

                    break;

                default:

                    bean."${key}" = (childNodes as String)?.trim();

                    break;
            }
        }

        return bean;
    }

    Rss.Item crawler_(String url, String rootExpression, String json) {

        Map mappingConfig = JSON.parse(json);

        Document document = this.jsoupUtilsService.toDocumentFromUrl(url);

        Element root = this.runExpression(document, rootExpression);

        return parseHTML(mappingConfig, root, "root");
    }

    void crawler() {

        Date now = new Date();

        List<HotNews> deleteHotNewsList = HotNews.findAllByIsDeleted(false);

        HotNewsConfig.findAllByIsDeleted(false).each { HotNewsConfig rssConfig ->

            Rss.Item item = this.crawler_(rssConfig.rssUrl, rssConfig.rootExpression, rssConfig.configJson);

            News news = News.findByGuidAndIsDeleted(item.guid, false);

            Boolean isExisted = news ? true : false;

            if (!news) {

                news = new News(isDeleted: false);
            }

            Date pubDate_ = applicationUtilsService.parseRssDate(
                    item.pubDate, rssConfig.dateFormat, rssConfig.timeZone
            ) ?: news?.pubDate ?: now;

            news.with {

                title = item.title;
                link = item.link;
                pubDate = pubDate_;
                guid = item.guid;
                description = item.description;
                lastModifiedUser = "system";
                lastModifiedTime = now;

                save(flush: true);
            }

            List<Image> existedImages = isExisted ? Image.findAllByIsDeletedAndReferenceId(false, news.id) : null;

            item?.thumbnails.each { Rss.Thumbnail thumbnail ->

                /**
                 * neu ton tai image roi thi khong thuc hien tao moi nua;
                 */
                if (existedImages?.find { it.url == thumbnail.url }) return;

                Image image = new Image(
                        type: thumbnail.type, width: thumbnail.width, height: thumbnail.height,
                        url: thumbnail.url, referenceId: news.id,
                        referenceType: ApplicationConstant.IMAGE_REFERENCE_TYPE_NEWS,
                        isDeleted: false, lastModifiedUser: "system", lastModifiedTime: now
                );

                image.save(flush: true);
            };

            HotNews hotNews = isExisted ? HotNews.findByNewsIdAndIsDeleted(news.id, false) : new HotNews(isDeleted: false);

            hotNews.with {

                newsId = news.id;
                lastModifiedUser = "system";
                lastModifiedTime = now;

                save(flush: true);
            }

            deleteHotNewsList?.remove(hotNews);
        }

        deleteHotNewsList?.each {

            it.isDeleted = true;

            it.save(flush: true);
        }
    }
}
