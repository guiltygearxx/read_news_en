package com.azsolutions.domain

class News implements BaseDomain {

    String title;
    String link;
    Date pubDate;
    String guid;
    String description;
    String rssSourceGroupId;

    static constraints = {

        lastModifiedTime nullable: true
        lastModifiedUser nullable: true
        isDeleted nullable: true
        description nullable: true
    }

    static mapping = {

        id generator: 'uuid'
        isDeleted defaultValue: false
    }
}
