package com.azsolutions.controller

import com.azsolutions.ApplicationConstant
import com.azsolutions.domain.News
import grails.converters.JSON
import groovy.time.TimeCategory

class ExampleController {

    def rssCrawlerService;
    def hotNewsCrawlerService;
    def imageUtilsService;
    def imageDetectSizeService;
    def lowImageSizeNewsScanService;
    def imageCrawlerService;
    def newsContentCrawlerService;
    def newsContentCrawlerConfigService;

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

    def example8() {

        News news = News.get("4028e485651533fb01651534524c0008");

        def config = newsContentCrawlerConfigService.getConfigJsonByRssConfigId("5ad1e451-8dfc-4450-b7a0-f40e4e7c106d");

        render([isSuccess: true, result: newsContentCrawlerService.crawl_(news, config, new Date())] as JSON);
    }

    def example9() {

        Date fromDate;
        Date toDate;

        use(TimeCategory) {
            toDate = new Date();
            fromDate = toDate - 1.hours;
        }

        println toDate;
        println fromDate;

        newsContentCrawlerService.crawl(fromDate, toDate, 5);

        render([isSuccess: true] as JSON);
    }

    def example10() {

        def news = new News(
                title: 'Trực thăng Mi-8 chở công nhân dầu mỏ rơi tại Nga, 18 người chết',
                link: 'http://www.tapchigiaothong.vn/truc-thang-mi-8-cho-cong-nhan-dau-mo-roi-tai-nga-18-nguoi-chet-d63694.html',
                pubDate: new Date(),
                guid: 'http://www.tapchigiaothong.vn/truc-thang-mi-8-cho-cong-nhan-dau-mo-roi-tai-nga-18-nguoi-chet-d63694.html',
                description: 'Một chiếc trực thăng Mi-8 của hãng hàng không Utair rơi tại vùng Krasnoyarsk, Nga trong khi đang chở 15 công nhân đến một giếng dầu.',
                rssSourceGroupId: 'c73f98f2-3012-4151-90e8-ad894ee1378d',
                createdTime: new Date(),
                lastModifiedTime: new Date(),
                lastModifiedUser: 'admin',
                isDeleted: false,
        ).save(flush: true);

        render([isSuccess: true, result: news] as JSON);
    }
}
