package com.azsolutions.domain

class HotNewsConfig implements BaseDomain {

    String rssUrl;
    String rootExpression;
    String configJson;
    String dateFormat;
    String timeZone;

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