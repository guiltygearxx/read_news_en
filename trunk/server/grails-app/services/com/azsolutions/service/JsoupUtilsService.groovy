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

    HtmlWrapper toHtmlWrapper(Element node) {

        return new HtmlWrapper(node: node);
    }

    public static void main(String[] args) {

        String content = "http://www.tapchigiaothong.vn/truc-thang-mi-8-cho-cong-nhan-dau-mo-roi-tai-nga-18-nguoi-chet-d63694.html";

        Element node = Jsoup.parse(content.toURL(), 10000);

        node = node.selectFirst("article");

        node.select("script, .list-related, .tags, .adsbygoogle, .fb-like, .comment, h1, .intro, .reg-date, .author, .item").remove();

        new HtmlWrapper(node: node).removeEmptyNode([excludeImg: true]).removeStyle();

        println node.html();
    }


}
