package com.azsolutions.controller

import com.azsolutions.domain.Image

class ImageController extends DefaultRestfulController<Image> {

    ImageController() {
        super(Image)
    }

    ImageController(Class<Image> resource) {
        super(resource)
    }

    ImageController(Class<Image> resource, boolean readOnly) {
        super(resource, readOnly)
    }

    @Override
    protected Closure buildFilterClosure() {

        List<String> referenceIds = params.getList("referenceIds");

        Closure defaultFilter = super.buildFilterClosure();

        return {

            inList("referenceId", referenceIds);

            delegate.with defaultFilter;
        }
    }
}
