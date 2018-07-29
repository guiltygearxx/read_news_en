package com.azsolutions.service

import com.azsolutions.domain.RssConfig
import grails.converters.JSON
import grails.gorm.transactions.Transactional

@Transactional
class RssConfigService {

    private List<RssConfig> allRssConfigs;

    private Map<String, Map> configJsonMapbyRssConfigId;

    void cacheRssConfig() {

        println "RssConfigService.cacheRssConfig: start";

        this.allRssConfigs = RssConfig.findAllByIsDeleted(false);

        this.configJsonMapbyRssConfigId = [:];

        this.allRssConfigs?.each { RssConfig rssConfig ->

            this.configJsonMapbyRssConfigId << [(rssConfig.id): JSON.parse(rssConfig.configJson)];
        }
    }

    Map getConfigJsonByRssConfigId(String rssConfigId) {

        return this.configJsonMapbyRssConfigId?.get(rssConfigId);
    }
}
