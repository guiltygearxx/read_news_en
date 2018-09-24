package com.azsolutions.job

import groovy.time.TimeCategory;

class LowImageSizeNewsScanJob {

    public static int DELAY_TIME_IN_MINUTES = 10;
    public static int SCAN_RANGE_IN_MINUTES = 15;
    public static long MIN_SIZE = 6400;

    def lowImageSizeNewsScanService;

    static triggers = {
        simple name: 'LowImageSizeNewsScanJob', startDelay: 10000, repeatInterval: 5 * 60 * 1000l; // 5 minues;
    }

    def execute() {

        Date now = new Date();

        Date fromDate;
        Date toDate;

        use(TimeCategory) {

            toDate = now - DELAY_TIME_IN_MINUTES.minutes;
            fromDate = toDate - SCAN_RANGE_IN_MINUTES.minutes;
        }

        lowImageSizeNewsScanService.scan(fromDate, toDate, MIN_SIZE);
    }
}
