package com.azsolutions.domain

class LowImageSizeNews {

    String id;
    Date lastModifiedTime;
    Date createdTime;
    Long size;
    Integer scannedTimes;
    String scanStatus;

    static constraints = {

        lastModifiedTime nullable: true
        createdTime nullable: true
        size nullable: true
        scannedTimes nullable: true
    }

    static mapping = {

        id(column: "news_id")
        version false;
    }
}
