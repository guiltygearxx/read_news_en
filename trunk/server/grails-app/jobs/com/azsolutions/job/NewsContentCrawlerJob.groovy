package com.azsolutions.job

import groovy.time.TimeCategory;

class NewsContentCrawlerJob {

    public static final int DELAY_TIME_IN_MINUTES = 5;
    public static final int SCAN_RANGE_IN_MINUTES = 15;
    public static final int MAX_SCANNED_TIMES = 5;

    def newsContentCrawlerService;

    static triggers = {
        simple name: 'NewsContentCrawlerJob', startDelay: 10000, repeatInterval: 5 * 60 * 1000l; // 5 minutes
    }

    def execute() {

        Date now = new Date();

        Date fromDate;
        Date toDate;

        use(TimeCategory) {

            toDate = now - DELAY_TIME_IN_MINUTES.minutes;
            fromDate = toDate - SCAN_RANGE_IN_MINUTES.minutes;
        }

        newsContentCrawlerService.crawl(fromDate, toDate, MAX_SCANNED_TIMES);
    }
}
