package com.azsolutions.controller

import com.azsolutions.domain.NewsContent

class NewsContentController extends DefaultRestfulController<NewsContent> {

    NewsContentController() {
        super(NewsContent)
    }

    NewsContentController(Class<NewsContent> resource) {
        super(resource)
    }

    NewsContentController(Class<NewsContent> resource, boolean readOnly) {
        super(resource, readOnly)
    }
}
