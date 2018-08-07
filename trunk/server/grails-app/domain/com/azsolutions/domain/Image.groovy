package com.azsolutions.domain

class Image implements BaseDomain {

    String type;
    Integer width;
    Integer height;
    String url;
    String referenceId;
    String referenceType;
    Long size; // = width * height
    Date createdTime;

    static constraints = {

        lastModifiedTime nullable: true
        lastModifiedUser nullable: true
        isDeleted nullable: true

        height nullable: true
        width nullable: true
        size nullable: true
        type nullable: true
        createdTime nullable: true
    }

    static mapping = {

        id generator: 'uuid'
        isDeleted defaultValue: false
    }
}
