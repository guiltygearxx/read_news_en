package com.azsolutions.job

import groovy.time.TimeCategory

class ImageCrawlerJob {

    public static final int DELAY_TIME_IN_MINUTES = 15;
    public static final int SCAN_RANGE_IN_MINUTES = 15;

    static triggers = {
        simple name: 'ImageCrawlerJob', startDelay: 10000, repeatInterval: 5 * 60 * 1000l; // 5 minues;
    }

    def imageCrawlerService;

    def execute() {

        Date now = new Date();

        Date fromDate;
        Date toDate;

        use(TimeCategory) {

            toDate = now - DELAY_TIME_IN_MINUTES.minutes;
            fromDate = toDate - SCAN_RANGE_IN_MINUTES.minutes;
        }

        imageCrawlerService.crawl(fromDate, toDate);
    }
}
