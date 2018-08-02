package com.azsolutions.controller


import grails.converters.JSON

class ExampleController {

    def readRssService;
    def rssCrawlerService;
    def hotNewsCrawlerService;
    def imageUtilsService;
    def imageDetectSizeService;

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

    def example4() {

        String url = "https://images.vov.vn/80x80/Uploaded/ql0Rp46PYwc/2018_07_29/kho_vang_nga_UUEQ.jpg";

        render([size: imageUtilsService.detectImageSize(url)] as JSON);
    }

    def example5() {

        imageDetectSizeService.detect();

        render([isSuccess: true] as JSON);
    }
}
