package com.azsolutions.service

import grails.gorm.transactions.Transactional
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element

@Transactional
class JsoupUtilsService {

    public static final int HOT_NEWS_CRAWLER_TIMEOUT = 5000;

    Document toDocument(String content) {

        return Jsoup.parse(content);
    }

    Document toDocumentFromUrl(String url) {

        return Jsoup.parse(url.toURL(), HOT_NEWS_CRAWLER_TIMEOUT);
    }

    public static void main(String[] args) {

        String content = "http://vietnamnet.vn/";

        Element node = Jsoup.parse(content.toURL(), 1000);

        node = node.selectFirst('.TopArticle');

        println node.selectFirst('.articletype_1').text();

        println node.selectFirst('.TopLead').text();

        println "http://vietnamnet.vn" + node.selectFirst('.articletype_1').attr("href");

        node.select("img").each {

            println it.attr("src");

            println it.attr("width");

            println it.attr("height");
        }
    }
}
