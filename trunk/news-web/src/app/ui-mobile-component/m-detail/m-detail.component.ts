import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-detail',
  templateUrl: './m-detail.component.html',
  styleUrls: ['./m-detail.component.css']
})
export class MDetailComponent implements OnInit {

  constructor() { }

  innerContentNews: string;
  ngOnInit() {
      this.innerContentNews  ="<p class=\"single-excerpt\" style=\"font-weight:700\"> <strong>(VTC News) - Cuối ngày hôm nay (22/7), Hà Nội vẫn còn không ít nơi bị ngập khiến cho việc đi lại của người dân rất khó khăn.</strong> </p> \n" +
          "<style>.listNewsbvctlq .adv{text-align:left}</style>   \n" +
          "<div class=\"single-main-content\" id=\"content_detail\"> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5937-29-1758506.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 1\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption> \n" +
          "   <p class=\"expEdit\">Dù trời không còn mưa mà chuyển sang nắng ráo, song tại Hà Nội vẫn còn không ít điểm bị ngập lụt.&nbsp;</p> \n" +
          "  </figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5902-26-1758459.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 2\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption> \n" +
          "   <p class=\"expEdit\">Theo ghi nhận của PV <em>VTC News</em>, chiều 22/7, trên đường gom đại lộ Thăng Long vẫn còn hai điểm ngập sâu, trong đó có&nbsp;lối rẽ vào&nbsp;Thiên đường Bảo Sơn.</p> \n" +
          "  </figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5891-24-1758429.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 3\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption> \n" +
          "   <p class=\"expEdit\">Có nơi vẫn còn ngập tới 60cm, việc đi lại của người dân gặp nhiều khó khăn. Không ít xe máy, thậm chí cả ô tô bị chết máy.</p> \n" +
          "  </figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5862-21-1758376.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 4\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption></figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5927-28-1758484.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 5\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption> \n" +
          "   <p class=\"expEdit\">Những người dân sống&nbsp;sát đại lộ Thăng Long&nbsp;cho hay nước đã rút khá nhiều so với cách đây một ngày.&nbsp;</p> \n" +
          "  </figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5732-12-1758226.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 6\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption></figcaption> \n" +
          " </figure>\n" +
          " <div class=\"adv\" style=\"margin-top:0px;margin-bottom:0px;\">\n" +
          "  <div class=\"e\" style=\"\">\n" +
          "   <!--Script tag (include before the closing </body> tag)--> \n" +
          "   <script type=\"text/javascript\">      var abd_media = \"media.adnetwork.vn\";      var abd_width = 640; /*width of video player*/      var abd_height = 360; /*height of video player*/      var abd_skip =7;      var abd_flash =true;      var abd_popup = false;      var abd_wid =1280898471;      var abd_zid =1444355616;      var abd_content_id = \"#content_detail\"; /*.class or #id of content wrapper*/      var abd_position=4; /*the paragraph position where ads display*/  </script> \n" +
          "   <script src=\"https://media.adnetwork.vn/assets/js/abd.inpage.preroll.v2.js\" type=\"text/javascript\"></script>\n" +
          "  </div>\n" +
          " </div> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5756-14-1758258.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 7\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption> \n" +
          "   <p class=\"expEdit\">...tháo giày, dép trước khi đi qua đoạn đường ngập.</p> \n" +
          "  </figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5658-7-1758134.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 8\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption></figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5597-4-1758085.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 9\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption></figcaption> \n" +
          " </figure> \n" +
          " <figure class=\"expNoEdit\">\n" +
          "  <img src=\"https://image.vtc.vn/resize/685x456/files/ctv.truyenhinh/2018/07/22/img_5710-10-1758187.jpg\" alt=\"Anh: Dan Ha Noi bi bom vuot bien nuoc ve nha chieu cuoi tuan hinh anh 10\" width=\"685\" height=\"456\"> \n" +
          "  <figcaption></figcaption> \n" +
          " </figure> \n" +
          " <p>&gt;&gt;&gt; Đọc thêm:&nbsp;<em><strong><a href=\"https://vtc.vn/canh-tho-mong-ngay-lut-ca-vang-keo-nhau-boi-tung-tang-tren-san-truong-d414891.html\">Cảnh thơ mộng ngày lụt: Cá vàng kéo nhau bơi tung tăng trên sân trường</a></strong></em></p> \n" +
          " <footer style=\"text-transform: uppercase; color: #a3171e;font-weight:700;float:right\">\n" +
          "  VIỆT AN \n" +
          " </footer>   \n" +
          " <div class=\"adv\" style=\"margin-top:0px;margin-bottom:0px;\"></div> \n" +
          "</div> \n" +
          "<!--End Article Body-->";
  }

}
