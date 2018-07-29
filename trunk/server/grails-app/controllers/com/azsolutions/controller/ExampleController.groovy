package com.azsolutions.controller


import grails.converters.JSON

class ExampleController {

    def readRssService;
    def rssCrawlerService;
    def hotNewsCrawlerService;

    def crawler() {

        rssCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }

//    def example() {
//
//        render([isSuccess: true, result: readRssService.readRss(RssConfig.get("15af7393-e4ca-450e-8b39-2bc02c99dee6"))] as JSON);
//    }

    def example2() {

        this.hotNewsCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }

    def example3() {

        String url = "http://vtc.vn/the-thao.rss";

        XmlSlurper parser = new XmlSlurper();

        BufferedReader reader = url.toURL().newReader(requestProperties: ['User-Agent': 'AZNews']);

        String text = reader.text;

        def channel = parser.parseText(text).channel;

        render([isSuccess: true] as JSON);
    }
}
