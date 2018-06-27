package com.azsolutions.domain

class RssSource implements BaseDomain {

    String code;
    String categoryId;
    String rssUrl;
    String rssSourceGroupId;

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
