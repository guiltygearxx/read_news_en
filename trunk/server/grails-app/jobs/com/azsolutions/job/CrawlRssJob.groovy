package com.azsolutions.job

class CrawlRssJob {

    def rssCrawlerService;

    static triggers = {
        simple name: 'CrawlRssJob', startDelay: 10000, repeatInterval: 60 * 60 * 1000l; // execute job once in 1 hours
    }

    def execute() {

        rssCrawlerService.crawler();
    }
}
