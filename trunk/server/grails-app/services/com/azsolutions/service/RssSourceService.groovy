package com.azsolutions.service

import com.azsolutions.domain.RssSource
import grails.gorm.transactions.Transactional

@Transactional
class RssSourceService {

    List<RssSource> rssSources;

    private Map<String, RssSource> rssSourceMapById;

    void cacheRssSources() {

        println "RssSourceService.cacheRssSources: start";

        rssSources = RssSource.findAllByIsDeleted(false);

        rssSourceMapById = [:];

        rssSources.each { rssSourceMapById << [(it.id): it] };
    }

    RssSource findRssSourceById(String rssSourceId) {

        return this.rssSourceMapById?.get(rssSourceId);
    }
}
