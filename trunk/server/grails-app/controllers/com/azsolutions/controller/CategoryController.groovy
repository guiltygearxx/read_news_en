package com.azsolutions.controller

import com.azsolutions.domain.Category

class CategoryController extends DefaultRestfulController<Category> {

    CategoryController() {
        super(Category)
    }

    CategoryController(Class<Category> resource) {
        super(resource)
    }

    CategoryController(Class<Category> resource, boolean readOnly) {
        super(resource, readOnly)
    }
}
