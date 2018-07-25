package com.azsolutions.controller

import com.azsolutions.domain.RssConfig
import grails.converters.JSON

class ExampleController {

    def readRssService;
    def rssCrawlerService;
    def hotNewsCrawlerService;

    def crawler() {

        rssCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }

    def example() {

        render([isSuccess: true, result: readRssService.readRss(RssConfig.get("15af7393-e4ca-450e-8b39-2bc02c99dee6"))] as JSON);
    }

    def example2() {

        this.hotNewsCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }
}
