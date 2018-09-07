package com.azsolutions.domain

class MissingContentNews {

    String id;
    Date lastModifiedTime;
    Date createdTime;
    Integer scannedTimes;
    String scanStatus;
    String newsContentCrawlerConfigId;

    static constraints = {

        lastModifiedTime nullable: true
        createdTime nullable: true
        scannedTimes nullable: true
        newsContentCrawlerConfigId nullable: true
    }

    static mapping = {

        id(column: "news_id", generator: "assigned", type: "string")
        version false;
    }
}
