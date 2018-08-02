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
      this.innerContentNews  ="<meta itemprop=\"datePublished\" content=\"2018-07-22T21:20:00T+07:00\"> \n" +
          "<h1 class=\"cms-title\">Top 3 con giáp cẩn thận khuynh ra bại sản cuối năm 2018</h1>  \n" +
          "<div id=\"topContent\" style=\"position:relative;\">  \n" +
          " <div class=\"text\"> \n" +
          "  <h3 class=\"sapo cms-desc\">\n" +
          "   <div>\n" +
          "    3 con giáp được gọi tên dưới đây phải hết sức cẩn trọng bởi rất dễ bị tổn thất về tiền bạc vào cuối năm 2018. \n" +
          "   </div></h3> \n" +
          "  <!-- <div id=\"AdAsia\"></div> --> \n" +
          "  <div id=\"abody\" class=\"cms-body\">\n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    <strong style=\"font-size: 16px;\">Tuổi Tuất</strong>\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Năm nay là năm tuổi của người tuổi Tuất, vận thế cả năm có nhiều biến động, đặc biệt thời điểm cuối năm bước vào cục diện “bán hợp hỏa” khiến cho tài vận của con giáp này bị khắc chế. Chính vì thế, trong thời gian cuối năm, \n" +
          "    <strong>con giáp</strong> này sẽ gặp nhiều rủi ro về tài chính. Con giáp này cần cẩn thận trong việc kết giao bạn bè để tránh tiểu nhân đặt điều, dựng chuyện gây tổn thất về tiền bạc.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"> \n" +
          "    <div style=\"text-align:center;\"> \n" +
          "     <table class=\"contentimg\" style=\"text-align: center;\"> \n" +
          "      <tbody> \n" +
          "       <tr> \n" +
          "        <td><img src=\"https://images.kienthuc.net.vn/uploaded/quynhtien/2018_07_22/top-3-con-giap-can-than-khuynh-ra-bai-san-cuoi-nam-2018.jpg\" style=\"width: 500px; height: 280px;\" alt=\"Top 3 con giap can than khuynh ra bai san cuoi nam 2018\" title=\"Top 3 con giáp cẩn thận khuynh ra bại sản cuối năm 2018\"></td> \n" +
          "       </tr> \n" +
          "       <tr> \n" +
          "        <td style=\"text-align: center;\">Ảnh minh họa.&nbsp;</td> \n" +
          "       </tr> \n" +
          "      </tbody> \n" +
          "     </table> \n" +
          "    </div> \n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Những người \n" +
          "    <em>tuổi Tuất</em> kinh doanh buôn bán nên thận trọng khi ký kết hợp đồng và nên tìm hiểu kỹ càng trước khi quyết định đầu tư hay mở rộng kinh doanh để tránh rơi vào tình trạng “phá sản”.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    <strong>Tuổi Thân</strong>\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Năm nay, người tuổi Thân bước vào cục diện “Tam Hội Thái Tuế” đồng nghĩa với việc gặp được “Tam Hội quý nhân”. Tuy sẽ có được nhiều cơ hội phát triển nhưng do bị hung tinh “Mạch Việt” soi chiếu nên gặp rất nhiều khó khăn trong cuộc sống.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Cuối năm 2018, vận thế đi xuống, tài vận cũng không hanh thông nên lời khuyên cho người tuổi Thân trong thời gian này đó là cho dù kinh doanh, đầu tư hay làm công ăn lương nhất định phải cẩn thận trong quản lý tài chính và không nên quá mạo hiểm để tránh tổn thất về tiền bạc.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    <strong>Tuổi Mão</strong>\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Người tuổi Mão vào thời gian cuối năm gặp phải hao tinh phá tài. Hao tinh sẽ dẫn đến “phá tài, bại tài, bị lừa gạt về tiền bạc, đầu tư phá sản”, ảnh hưởng tiêu cực đến tài vận cả năm.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    Năm nay, người tuổi Mão cần thận trọng khi bỏ tiền ra đầu tư, đặc biệt là trong lĩnh vực bất động sản, chứng khoán. Nếu không cẩn thận, con giáp này sẽ rất dễ bị lừa gạt tiền bạc do quá tin vào người khác.\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    <em>* Thông tin trong bài chỉ mang tính tham khảo.</em>\n" +
          "   </div> \n" +
          "   <div style=\"text-align: justify;\"></div> \n" +
          "   <div style=\"text-align: justify;\">\n" +
          "    <br> \n" +
          "   </div>\n" +
          "  </div>  \n" +
          "  <div class=\"author\"> \n" +
          "   <span class=\"name\">Theo Khoevadep</span> \n" +
          "  </div>   \n" +
          "  <div style=\"margin-bottom:10px;text-align: center;\"> \n" +
          "  </div>    \n" +
          " </div>  \n" +
          " <div style=\"clear:both;\"></div> \n" +
          "</div>  \n" +
          "<!-- text -->            \n" +
          "<div style=\"margin-bottom:10px;text-align: center;\"> \n" +
          " <div style=\"width:300px; height:250px; margin:0 auto;\">  \n" +
          " </div> \n" +
          "</div>  \n" +
          "<div style=\"margin-bottom:10px;margin-left:-10px;width: 670px;\">   \n" +
          "</div>";
  }

}
