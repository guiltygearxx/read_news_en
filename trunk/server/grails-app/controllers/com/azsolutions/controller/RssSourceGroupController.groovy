package com.azsolutions.controller

import com.azsolutions.domain.RssSourceGroup

class RssSourceGroupController extends DefaultRestfulController<RssSourceGroup> {

    RssSourceGroupController() {
        super(RssSourceGroup)
    }

    RssSourceGroupController(Class<RssSourceGroup> resource) {
        super(RssSourceGroup)
    }

    RssSourceGroupController(Class<RssSourceGroup> resource, boolean readOnly) {
        super(resource, readOnly)
    }
}
