package com.azsolutions.service.datastore

import com.azsolutions.domain.MissingContentNews
import com.azsolutions.domain.News
import com.azsolutions.domain.NewsContentCrawlerConfig
import com.azsolutions.service.crawler.NewsContentCrawlerService
import grails.converters.JSON
import grails.events.annotation.Subscriber
import grails.gorm.transactions.Transactional
import org.grails.datastore.mapping.engine.event.AbstractPersistenceEvent
import org.grails.datastore.mapping.engine.event.PostInsertEvent

@Transactional
class NewsListenerAsyncService {

    def newsContentCrawlerConfigService;

    private Boolean isEventOnNews(AbstractPersistenceEvent event) {
        return event.entityObject instanceof News;
    }

    @Subscriber
    void afterInsert(PostInsertEvent event) {

        if (!isEventOnNews(event)) return;

        this.insertMissingContentNews(event);
    }

    private void insertMissingContentNews(AbstractPersistenceEvent event) {

        News news = event.entityObject;

        String newsId = event.entityAccess.getProperty('id') as String;

        Date lastModifiedTime = news.lastModifiedTime;

        String link = news.link;

        NewsContentCrawlerConfig config = newsContentCrawlerConfigService.findConfigForUrl(link);

        if (!config) return;

        MissingContentNews missingContentNews = new MissingContentNews(

                lastModifiedTime: lastModifiedTime, createdTime: lastModifiedTime,
                scannedTimes: 0, scanStatus: NewsContentCrawlerService.MISSING_IMAGE_SIZE_SCAN_STATUS_NEW,
                newsContentCrawlerConfigId: config.id
        );

        missingContentNews.id = newsId;

        missingContentNews.save();
    }
}
