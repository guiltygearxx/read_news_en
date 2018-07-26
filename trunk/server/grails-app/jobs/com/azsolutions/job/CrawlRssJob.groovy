package com.azsolutions.job

class CrawlRssJob {

    def rssCrawlerService;

    static triggers = {
//        simple name: 'CrawlRssJob', startDelay: 10000, repeatInterval: 5 * 60 * 1000l; // execute job once in 5 seconds
        simple name: 'CrawlRssJob', startDelay: 10000, repeatInterval: 2000l; // execute job once in 5 seconds
    }

    def execute() {

        rssCrawlerService.crawler();
    }
}
