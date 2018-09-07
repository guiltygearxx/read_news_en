package server

import com.azsolutions.service.RssConfigService

class BootStrap {

    def rssConfigService;
    def rssSourceGroupService;
    def rssSourceService;
    def newsContentCrawlerConfigService;

    def init = { servletContext ->

        this.rssSourceGroupService.cacheRssSourceGroups();

        this.rssConfigService.cacheRssConfig();

        this.rssSourceService.cacheRssSources();

        this.newsContentCrawlerConfigService.cacheConfigs();
    }

    def destroy = {
    }
}
