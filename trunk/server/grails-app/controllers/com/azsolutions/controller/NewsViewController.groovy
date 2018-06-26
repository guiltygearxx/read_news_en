package com.azsolutions.controller

import com.azsolutions.domain.NewsView

class NewsViewController extends DefaultRestfulController<NewsView> {

    NewsViewController() {
        super(NewsView)
    }

    NewsViewController(Class<NewsView> resource) {
        super(resource)
    }

    NewsViewController(Class<NewsView> resource, boolean readOnly) {
        super(resource, readOnly)
    }
}
