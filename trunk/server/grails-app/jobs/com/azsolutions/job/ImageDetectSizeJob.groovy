package com.azsolutions.job

import groovy.time.TimeCategory;

class ImageDetectSizeJob {

    public static int DELAY_TIME_IN_MINUTES;
    public static int SCAN_RANGE_IN_MINUTES;
    public static int MAX_SCANNED_TIMES;

    def imageDetectSizeService;

    static triggers = {
        simple name: 'ImageDetectSizeJob', startDelay: 10000, repeatInterval: 5 * 60 * 1000l; //5 minutes;
    }

    def execute() {

        Date now = new Date();

        Date fromDate;
        Date toDate;

        use(TimeCategory) {

            toDate = now - DELAY_TIME_IN_MINUTES.minutes;
            fromDate = toDate - SCAN_RANGE_IN_MINUTES.minutes;
        }

        imageDetectSizeService.detect(fromDate, toDate, MAX_SCANNED_TIMES);
    }
}
