package com.azsolutions.service.background

import grails.gorm.transactions.Transactional
import groovy.sql.Sql

@Transactional
class LowImageSizeNewsScanService {

    public static int MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;

    public static final String LOW_IMAGE_SCAN_SQL = "insert into low_image_size_news (news_id, last_modified_time, created_time, size, scanned_times, scan_status, link)\n" +
            "select ns.id, sysdate(), sysdate(), max(ifnull(ie.size, 0)), 0, 'new', ns.link\n" +
            "from news ns\n" +
            "       left join low_image_size_news ls on ls.news_id = ns.id\n" +
            "       left join image ie on ie.reference_id = ns.id and ie.is_deleted = false\n" +
            "where ns.is_deleted = false\n" +
            "  and ns.created_time >= :fromDate\n" +
            "  and ns.created_time < :toDate\n" +
            "  and ls.news_id is null\n" +
            "group by ns.id\n" +
            "having max(ifnull(ie.size, 0)) < :minsize"

    def sessionFactory;
    def applicationUtilsService;

    void scan(Date fromDate_, Date toDate_, Long minSize) {

        applicationUtilsService.scan(
                fromDate_, toDate_, MAX_SCANNED_PERIOD_RANGE_IN_MINUTES,
                { Date fromDate, Date toDate, Integer scannedTimes_ ->

                    Sql sql = new Sql(sessionFactory.currentSession.connection());

                    sql.execute([minsize: minSize, fromDate: fromDate, toDate: toDate], LOW_IMAGE_SCAN_SQL);
                }
        );
    }
}
