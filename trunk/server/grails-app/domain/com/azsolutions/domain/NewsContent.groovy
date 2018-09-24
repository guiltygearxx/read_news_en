package com.azsolutions.domain

class NewsContent implements BaseDomain {

    String content;

    static constraints = {

        lastModifiedTime nullable: true
        lastModifiedUser nullable: true
        isDeleted nullable: true

        content nullable: true
    }

    static mapping = {

        id generator: 'assigned'
        isDeleted defaultValue: false
    }
}