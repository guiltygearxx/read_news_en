package com.azsolutions.domain

class Category implements BaseDomain {

    String title;
    String code;
    String parentCategoryId;

    static constraints = {

        lastModifiedTime nullable: true
        lastModifiedUser nullable: true
        isDeleted nullable: true    
        parentCategoryId nullable: true
    }

    static mapping = {

        id generator: 'uuid'
        isDeleted defaultValue: false
    }
}
