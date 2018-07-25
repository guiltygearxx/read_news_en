package com.azsolutions.domain

class HotNews implements BaseDomain {

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
