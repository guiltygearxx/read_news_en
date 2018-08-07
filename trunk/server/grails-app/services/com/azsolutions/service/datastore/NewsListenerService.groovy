package com.azsolutions.service.datastore

import com.azsolutions.domain.News
import grails.events.annotation.gorm.Listener
import org.grails.datastore.mapping.engine.event.AbstractPersistenceEvent
import org.grails.datastore.mapping.engine.event.PreInsertEvent

/**
 * service này sẽ thực hiện set trường createdTime = lastModifiedTime khi thực hiện insert;
 */
class NewsListenerService {

    @Listener(News)
    void onPreInsert(PreInsertEvent event) {

        this.updateCreatedTimeAutomatically(event);
    }

    private void updateCreatedTimeAutomatically(AbstractPersistenceEvent event) {

        Date lastModifiedTime = event.entityAccess.getProperty('lastModifiedTime') as Date;

        event.entityAccess.setProperty('createdTime', lastModifiedTime);
    }
}
