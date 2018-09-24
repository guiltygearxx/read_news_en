import {Component} from '@angular/core';
import {NavController, ScrollEvent} from 'ionic-angular';
import {TrangChuPage} from "../trang-chu/trang-chu";
import {
  CATEGORY_ID_TINCHINH,
  CATEGORY_ID_TINNOIBAT,
  CATEGORY_ID_TINNONG,
  CATEGORY_ID_VIDEO
} from "../../common/application-constants";
import {Category} from "../../bean/category";
import {CategoryService} from "../../providers/category.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabsConfig: any = {
    sideMenu: "left"
  }

  categoryIds: string[] = [CATEGORY_ID_TINCHINH, CATEGORY_ID_TINNONG, CATEGORY_ID_TINNOIBAT, CATEGORY_ID_VIDEO];

  categories: Category[];

  trangChu: any = TrangChuPage;

  chuDe: any = TrangChuPage;

  category1: Category;

  category2: Category;

  constructor(public navCtrl: NavController,
              public categoryService: CategoryService) {

    this.initCategories();
  }

  contentScroll(event: ScrollEvent): void {

    console.log(event);
  }

  private initCategories(): void {

    let allCategories = this.categoryService.categories;

    this.categories = this.categoryIds.map(categoryId =>

      allCategories.find(category => category.id == categoryId)
    );
  }
}
