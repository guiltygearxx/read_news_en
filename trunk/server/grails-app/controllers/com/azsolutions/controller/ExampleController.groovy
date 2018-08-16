package com.azsolutions.controller

import com.azsolutions.ApplicationConstant
import grails.converters.JSON
import groovy.time.TimeCategory

class ExampleController {

    def rssCrawlerService;
    def hotNewsCrawlerService;
    def imageUtilsService;
    def imageDetectSizeService;
    def lowImageSizeNewsScanService;
    def imageCrawlerService;

    def crawler() {

        rssCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }

    def example2() {

        this.hotNewsCrawlerService.crawler();

        render([isSuccess: true] as JSON);
    }

    def example3() {

        String url = "http://vtc.vn/the-thao.rss";

        XmlSlurper parser = new XmlSlurper();

        BufferedReader reader = url.toURL().newReader(requestProperties: ['User-Agent': ApplicationConstant.HTTP_REQUEST_DEFAULT_USER_AGENT]);

        String text = reader.text;

        def channel = parser.parseText(text).channel;

        render([isSuccess: true] as JSON);
    }

    def example4() {

        String url = "https://images.vov.vn/80x80/Uploaded/ql0Rp46PYwc/2018_07_29/kho_vang_nga_UUEQ.jpg";

        render([size: imageUtilsService.detectImageSize(url)] as JSON);
    }

    def example5() {

        Date fromDate;
        Date toDate;

        use(TimeCategory) {
            toDate = new Date();
            fromDate = toDate - 3.days;
        }

        println toDate;
        println fromDate;

        imageDetectSizeService.detect(fromDate, toDate, 5);

        render([isSuccess: true] as JSON);
    }

    def example6() {

        Date fromDate;
        Date toDate;

        use(TimeCategory) {
            toDate = new Date();
            fromDate = toDate - 10.days;
        }

        lowImageSizeNewsScanService.scan(fromDate, toDate, 6400);

        render([isSuccess: true] as JSON);
    }

    def example7() {

        Date fromDate;
        Date toDate;

        use(TimeCategory) {
            toDate = new Date();
            fromDate = toDate - 10.days;
        }

        imageCrawlerService.crawl(fromDate, toDate);

        render([isSuccess: true] as JSON);
    }
}
