import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TrangChuPage} from "../trang-chu/trang-chu";
import {NewsViewService} from "../../providers/news-view.service";
import {CategoryService} from "../../providers/category.service";
import {ImageService} from "../../providers/image.service";

/**
 * Generated class for the ChuDePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chu-de',
  templateUrl: 'chu-de.html',
})
export class ChuDePage extends TrangChuPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsViewService: NewsViewService,
              public categoryService: CategoryService,
              public imageService: ImageService) {

    super(navCtrl, navParams, newsViewService, categoryService, imageService);
  }
}
