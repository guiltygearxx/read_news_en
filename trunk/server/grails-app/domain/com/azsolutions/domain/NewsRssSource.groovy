package com.azsolutions.domain

class NewsRssSource implements BaseDomain {

    String rssSourceId;
    String newsId;

    static constraints = {

        lastModifiedTime nullable: true
        lastModifiedUser nullable: true
        isDeleted nullable: true
    }

    static mapping = {

        id generator: 'uuid'
        isDeleted defaultValue: false
    }
}
