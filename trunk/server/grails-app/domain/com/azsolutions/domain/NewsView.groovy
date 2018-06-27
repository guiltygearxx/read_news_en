package com.azsolutions.domain

class NewsView implements BaseDomain {

    String categoryId;
    String title;
    String link;
    Date pubDate;
    String guid;
    String description;
    String newsId;
    String rssSourceGroupId;
    String rssSourceGroupTitle;

    static constraints = {
    }

    static mapping = {

        table "v_news";
        version false;
    }
}
