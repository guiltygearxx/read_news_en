package com.azsolutions.controller

import com.azsolutions.domain.News

class NewsController extends DefaultRestfulController<News> {

    NewsController() {
        super(News)
    }

    NewsController(Class<News> resource) {
        super(resource)
    }

    NewsController(Class<News> resource, boolean readOnly) {
        super(resource, readOnly)
    }
}