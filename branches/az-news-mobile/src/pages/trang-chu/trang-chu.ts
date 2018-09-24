import {Component} from '@angular/core';
import {InfiniteScroll, NavController, NavParams, Refresher} from 'ionic-angular';
import {NewsViewService} from "../../providers/news-view.service";
import {Category} from "../../bean/category";
import {IMAGE_REFERENCE_TYPE_NEWS} from "../../common/application-constants";
import {CategoryService} from "../../providers/category.service";
import {NewsView} from "../../bean/news-view";
import {ImageService} from "../../providers/image.service";
import {Image} from "../../bean/image";

/**
 * Generated class for the TrangChuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-trang-chu',
  templateUrl: 'trang-chu.html',
})
export class TrangChuPage {

  categoryId: string;

  category: Category;

  newsList: NewsView[];

  now: Date;

  images: Image[];

  private isFirstLoad: boolean = true;

  private categoryIds: string[];

  private newsOffset: number;

  private newsMax: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsViewService: NewsViewService,
              public categoryService: CategoryService,
              public imageService: ImageService) {
  }

  ionViewDidEnter(): void {

    if (this.isFirstLoad) {

      this.categoryId = this.navParams.get("categoryId");

      this.category = this.categoryService.categories.find(category => category.id == this.categoryId);

      this.categoryIds = this.getAllCategoryIdsByParentCategoryId();

      this.isFirstLoad = false;

      this.now = new Date();

      this.newsOffset = 0;

      this.newsMax = 10;

      this.images = [];

      this.newsList = [];

      this.loadNews(null);
    }
  }

  getImage(news: NewsView): Image {

    let image = this.images.find(image => image.referenceId == news.newsId);

    return image;
  }

  loadMoreNews(event: InfiniteScroll): void {

    this.loadNews(() => {

      event.complete();
    });
  }

  refreshPage(event: Refresher): void {

    this.now = new Date();

    this.newsOffset = 0;

    this.images = [];

    this.newsList = [];

    this.loadNews(() => {

      event.complete();
    });
  }

  private getAllCategoryIdsByParentCategoryId(): string[] {

    let allCategories = this.categoryService.categories;

    let categoryIds: string[] = [this.categoryId];

    let categoryId_;

    let index: number = 0;

    while (index < categoryIds.length) {

      categoryId_ = categoryIds[index];

      allCategories.forEach((category) => (category.parentCategoryId == categoryId_) && (categoryIds.push(category.id)));

      index++;
    }

    return categoryIds;
  }

  private loadNews(callbackFn: () => void): void {

    this.newsViewService
      .get({categoryIds: this.categoryIds, sort: "pubDate", order: "desc", max: this.newsMax, offset: this.newsOffset})
      .subscribe(newsList => {

        if (newsList) {

          newsList.forEach(news => this.newsList.push(news));

          this.newsOffset += (newsList ? newsList.length : 0);

          this.loadImages(newsList);
        }

        callbackFn && callbackFn();
      })
  }

  private loadImages(newsList: NewsView[]): void {

    if (!newsList) return;

    let newsIds = newsList ? newsList.map(item => item.newsId) : null;

    this.imageService
      .get({referenceIds: newsIds, referenceType: IMAGE_REFERENCE_TYPE_NEWS})
      .subscribe(images => images && images.forEach(image => this.images.push(image)));
  }
}
