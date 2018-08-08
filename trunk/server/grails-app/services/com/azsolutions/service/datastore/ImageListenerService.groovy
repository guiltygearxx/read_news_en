package com.azsolutions.service.datastore

import com.azsolutions.domain.Image
import com.azsolutions.domain.MissingSizeImage
import com.azsolutions.service.crawler.ImageDetectSizeService
import grails.events.annotation.gorm.Listener
import org.grails.datastore.mapping.engine.event.AbstractPersistenceEvent
import org.grails.datastore.mapping.engine.event.PostInsertEvent
import org.grails.datastore.mapping.engine.event.PreInsertEvent
import org.grails.datastore.mapping.engine.event.PreUpdateEvent

/**
 * service này sẽ thực hiện set trường image.size =  width * height môi khi đối tượng insert hoặc update trường
 * width or height;
 */
class ImageListenerService {


    @Listener(Image)
    void onPreInsert(PreInsertEvent event) {

        this.updateSizeAutomatically(event);

        this.updateCreatedTimeAutomatically(event);

        this.insertMissingSizeImage(event);
    }

    @Listener(Image)
    void afterInsert(PostInsertEvent event) {

        this.insertMissingSizeImage(event);
    }

    @Listener(Image)
    void onPreUpdate(PreUpdateEvent event) {

        Image image = ((Image) event.entityObject)

        if (image.isDirty('width') || image.isDirty("height")) {

            this.updateSizeAutomatically(event);
        }
    }

    private void updateSizeAutomatically(AbstractPersistenceEvent event) {

        Integer width = event.entityAccess.getProperty('width') as Integer;

        Integer height = event.entityAccess.getProperty('height') as Integer;

        if (!width || !height) return;

        event.entityAccess.setProperty('size', 1L * width * height);
    }

    private void updateCreatedTimeAutomatically(AbstractPersistenceEvent event) {

        Date lastModifiedTime = event.entityAccess.getProperty('lastModifiedTime') as Date;

        event.entityAccess.setProperty('createdTime', lastModifiedTime);
    }

    private void insertMissingSizeImage(AbstractPersistenceEvent event) {

        Integer width = event.entityAccess.getProperty('width') as Integer;

        Integer height = event.entityAccess.getProperty('height') as Integer;

        String id = event.entityAccess.getProperty('id') as String;

        if (!width || !height) {

            Date createdTime = event.entityAccess.getProperty('createdTime') as Date;

            new MissingSizeImage(
                    id: id, createdTime: createdTime, lastModifiedTime: createdTime, scannedTimes: 0,
                    scanStatus: ImageDetectSizeService.MISSING_IMAGE_SIZE_SCAN_STATUS_NEW,
            ).save()
        }
    }
}
