package com.azsolutions.domain

class CategoryNews implements BaseDomain {

    String categoryId;
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
