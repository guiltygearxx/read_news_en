package com.azsolutions.domain

class NewsContentCrawlerConfig implements BaseDomain {

    String configJson;
    String urlPattern;

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
