package com.azsolutions.service

import grails.gorm.transactions.Transactional
import org.jsoup.Jsoup
import org.jsoup.nodes.Document

@Transactional
class JsoupUtilsService {

    def toDocument(String content) {

        return Jsoup.parse(content);
    }

    public static void main(String[] args) {

        String content = "<a href=\"http://danviet.vn/giai-tri/song-chung-nha-sau-ly-hon-truong-quynh-anh-nong-bong-the-nay-tim-co-xao-long-894547.html\"><img width=\"80px\" border=\"0\" src=\"http://danviet.vn/upload/3-2018/images/2018-07-13/153149134996599-thumbnail.jpg?width=80\" align=\"left\" hspace=\"5\" /></a>Dù ở nhà hay ra phố, Trương Quỳnh Anh đều thu hút phái mạnh vì quá sexy.\n" +
                "\t<div style=\"clear:both;\"><ul ><li><a href=\"http://danviet.vn/giai-tri/tim-va-truong-quynh-anh-ly-hon-song-chung-nha-di-dien-ne-chup-anh-cung-nhau-894083.html\">Tim và Trương Quỳnh Anh ly hôn sống chung nhà, đi diễn né chụp ảnh cùng nhau</a></li><li><a href=\"http://danviet.vn/giai-tri/tim-chinh-thuc-khang-dinh-da-ly-hon-truong-quynh-anh-tuyen-bo-doc-than-893632.html\">Tim chính thức khẳng định đã ly hôn Trương Quỳnh Anh, tuyên bố độc thân</a></li><li><a href=\"http://danviet.vn/giai-tri/truong-quynh-anh-mac-vay-xuyen-thau-goi-cam-quyen-ru-nhu-nu-than-891684.html\">Trương Quỳnh Anh mặc váy xuyên thấu gợi cảm quyến rũ như nữ thần</a></li><li><a href=\"http://danviet.vn/giai-tri/tim-truong-quynh-anh-moi-nguoi-mot-nga-sau-1-nam-vuong-lum-xum-ly-hon-881683.html\">Tim - Trương Quỳnh Anh mỗi người một ngả sau 1 năm vướng lùm xùm ly hôn</a></li></ul></div>";

        Document document = Jsoup.parse(content);

        println document.text();

        document.select("img").each {

            println it.attr("src");
        }
    }
}
