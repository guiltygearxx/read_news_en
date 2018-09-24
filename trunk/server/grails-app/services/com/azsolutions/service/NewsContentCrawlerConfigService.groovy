package com.azsolutions.service

import com.azsolutions.domain.NewsContentCrawlerConfig
import grails.converters.JSON
import grails.gorm.transactions.Transactional

@Transactional
class NewsContentCrawlerConfigService {

    private List<NewsContentCrawlerConfig> allConfigs;

    private Map<String, Map> configJsonMapById;

    void cacheConfigs() {

        println "NewsContentCrawlerConfigService.cacheConfigs: start";

        this.allConfigs = NewsContentCrawlerConfig.findAllByIsDeleted(false);

        this.configJsonMapById = [:];

        this.allConfigs?.each { NewsContentCrawlerConfig rssConfig ->

            this.configJsonMapById << [(rssConfig.id): JSON.parse(rssConfig.configJson)];
        }
    }

    Map getConfigJsonByRssConfigId(String configId) {

        return this.configJsonMapById?.get(configId);
    }

    NewsContentCrawlerConfig findConfigForUrl(String url) {

        return allConfigs.find { url.matches(it.urlPattern) };
    }

    public static void main(String[] args) {

        println "http://www.tapchigiaothong.vn/truc-thang-mi-8-cho-cong-nhan-dau-mo-roi-tai-nga-18-nguoi-chet-d63694.html".matches("http://www.tapchigiaothong.vn/.*");
    }
}
