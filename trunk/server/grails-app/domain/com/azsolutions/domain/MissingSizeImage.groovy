package com.azsolutions.domain

class MissingSizeImage {

    String id;
    Date createdTime;
    Date lastModifiedTime;
    String scanStatus;
    Integer scannedTimes;

    static constraints = {

        createdTime nullable: true
        scanStatus nullable: true
        lastModifiedTime nullable: true
        scannedTimes nullable: true
    }

    static mapping = {

        id(column: "image_id")
        version false;
    }
}
