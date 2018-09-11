package com.azsolutions.domain

class LowImageSizeNews {

    String id;
    Date lastModifiedTime;
    Date createdTime;
    Long size;
    Integer scannedTimes;
    String scanStatus;
    String link;

    static constraints = {

        lastModifiedTime nullable: true
        createdTime nullable: true
        size nullable: true
        scannedTimes nullable: true
        link nullable: true
    }

    static mapping = {

        id(column: "news_id", generator: "assigned", type: "string")
        version false;
    }
}
