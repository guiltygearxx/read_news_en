package com.azsolutions.service.datastore

import com.azsolutions.domain.Image
import com.azsolutions.domain.MissingSizeImage
import com.azsolutions.service.crawler.ImageDetectSizeService
import grails.events.annotation.Subscriber
import grails.gorm.transactions.Transactional
import org.grails.datastore.mapping.engine.event.AbstractPersistenceEvent
import org.grails.datastore.mapping.engine.event.PostInsertEvent
import org.hibernate.event.spi.PostUpdateEvent

@Transactional
class ImageListenerAsyncService {

    private Boolean isEventOnNews(AbstractPersistenceEvent event) {
        return event.entityObject instanceof Image;
    }

    @Subscriber
    void afterInsert(PostInsertEvent event) {

        if (!isEventOnNews(event)) return;

        this.insertMissingSizeImage(event);
    }

    @Subscriber
    void afterUpdate(PostUpdateEvent event) {

        if (!isEventOnNews(event)) return;

        this.insertMissingSizeImage(event);
    }

    private void insertMissingSizeImage(AbstractPersistenceEvent event) {

        Image image = event.entityObject;

        Integer width = image.width;

        Integer height = image.height;

        String id = image.id;

//        String id = event.entityAccess.getProperty('id') as String;

        if (!width || !height) {

            Date createdTime = image.createdTime;

            MissingSizeImage missingSizeImage = new MissingSizeImage(
                    id: id, createdTime: createdTime, lastModifiedTime: createdTime, scannedTimes: 0,
                    scanStatus: ImageDetectSizeService.MISSING_IMAGE_SIZE_SCAN_STATUS_NEW,
            );

            missingSizeImage.id = id;

            missingSizeImage.save();
        }
    }
}
