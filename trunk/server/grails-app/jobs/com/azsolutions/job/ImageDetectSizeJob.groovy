package com.azsolutions.job;

class ImageDetectSizeJob {

    def imageDetectSizeService;

    static triggers = {
        simple name: 'ImageDetectSizeJob', startDelay: 10000, repeatInterval: 60 * 60 * 1000l;
        // execute job once in 1 hours
    }

    def execute() {

        imageDetectSizeService.detect();
    }
}
