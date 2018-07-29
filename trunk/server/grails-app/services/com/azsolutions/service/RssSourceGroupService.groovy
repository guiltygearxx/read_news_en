package com.azsolutions.service

import com.azsolutions.domain.RssSourceGroup
import grails.gorm.transactions.Transactional

@Transactional
class RssSourceGroupService {

    public List<RssSourceGroup> rssSourceGroups;

    void cacheRssSourceGroups() {

        println "RssSourceGroupService.cacheRssSourceGroups: start";

        this.rssSourceGroups = RssSourceGroup.findAllByIsDeleted(false);
    }
}
