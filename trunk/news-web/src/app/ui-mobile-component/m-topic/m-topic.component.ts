import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Image} from "../../bean/image";
import {NewsViewService} from "../../service/news-view.service";
import {NewsView} from "../../bean/news-view";
import {Observable} from "rxjs/Observable";
import {ImageService} from "../../service/image.service";
import {IMAGE_REFERENCE_TYPE_NEWS} from "../../common/application-constants";
import {CategoryService} from "../../service/category.service";

@Component({
    selector: 'app-m-topic',
    templateUrl: './m-topic.component.html',
    styleUrls: ['./m-topic.component.css']
})
export class MTopicComponent implements OnInit, AfterContentChecked {

    now: Date;

    /**
     * tin to nhat tren trang;
     */
    fixedTinChinhNews: NewsView;

    tinChinhNews: NewsView[];

    newsViewsGroupByCategoryId: { [categoryId: string]: NewsView[] };

    loadingFlagByCategoryId: { [categoryId: string]: boolean };

    imagesGroupByCategoryId: { [categoryId: string]: Image[] };

    newsTinChinhOffset: number;

    isLoadingMoreTinChinh: boolean;

    categoryId: string;

    /**
     * = true neu nhu so luong tin chinh load qua nhieu hoac khong con tin tuc de load nua;
     */
    stopLoadMoreTinChinh: boolean;

    constructor(protected route: ActivatedRoute,
                protected newsViewService: NewsViewService,
                protected imageService: ImageService,
                protected categoryService: CategoryService) {
    }

    ngOnInit(): void {

        this.now = new Date();

        this.newsViewsGroupByCategoryId = {};

        this.imagesGroupByCategoryId = {};

        this.loadingFlagByCategoryId = {};

        this.newsTinChinhOffset = 0;

        this.isLoadingMoreTinChinh = false;

        this.stopLoadMoreTinChinh = false;

        this.loadNewsByCategories();
    }

    ngAfterContentChecked(): void {

        let categoryId: string = this.route.snapshot.paramMap.get('categoryId');

        if (categoryId != this.categoryId) {

            this.newsViewsGroupByCategoryId[this.categoryId] = null;

            this.imagesGroupByCategoryId[this.categoryId] = null;

            this.loadingFlagByCategoryId[this.categoryId] = null;

            this.newsTinChinhOffset = 0;

            this.isLoadingMoreTinChinh = false;

            this.stopLoadMoreTinChinh = false;

            this.categoryId = categoryId;

            this.loadNewsByCategories();
        }
    }

    getTinChinhNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[this.categoryId];
    }

    getTinChinhNewsImage(news: NewsView): Image {

        return this.getNewsImage(this.categoryId, news);
    }

    getNewsImage(categoryId: string, news: NewsView): Image {

        let images = this.imagesGroupByCategoryId[categoryId]

        let image = news && images ? images.find(item => item.referenceId == news.newsId) : null;

        return image;
    }

    showMore(): void {

        let newsList = this.newsViewsGroupByCategoryId[this.categoryId];

        this.tinChinhNews.splice(0, 10).forEach(item => newsList.push(item));

        /**
         * neu tin danh sach tin chinh hien thi gan het > thuc hien load them du lieu tu server;
         */
        (this.tinChinhNews.length <= 10 && !this.stopLoadMoreTinChinh) && (this.loadMoreTinChinh());
    }

    _isLoading(categoryId: string): boolean {

        return this.loadingFlagByCategoryId[categoryId];
    }

    isLoadingTinChinh(): boolean {

        return this._isLoading(this.categoryId);
    }

    protected loadMoreTinChinh(): void {

        this.stopLoadMoreTinChinh = true;

        this.loadNewsViews(this.categoryId, 50, this.newsTinChinhOffset).subscribe(newsViews => {

            newsViews.forEach((news) => this.tinChinhNews.push(news));

            this.newsTinChinhOffset += newsViews.length;

            /**
             * load qua nhieu tin tuc roi thi nen stop khong load nua || khong con tin tuc de load nua;
             */
            this.stopLoadMoreTinChinh = !newsViews.length || this.newsTinChinhOffset > 1000;

            this.isLoadingMoreTinChinh = false;

            (newsViews && newsViews.length) && (this.loadImages(newsViews).subscribe(images => {

                let tinChinhImages = this.imagesGroupByCategoryId[this.categoryId];

                images.forEach((image) => tinChinhImages.push(image));
            }));
        });
    }

    protected loadNewsByCategories(): void {

        let categoryId = this.categoryId;

        this.loadingFlagByCategoryId[categoryId] = true;

        this.loadNewsViews(categoryId, 21, 0).subscribe(newsViews => {

            this.loadingFlagByCategoryId[categoryId] = false;

            this.afterLoadTinChinhNews(newsViews);
        });

    }

    protected afterLoadTinChinhNews(newsViews: NewsView[]): void {

        this.newsTinChinhOffset += newsViews.length;

        let allNews = newsViews.slice(0);

        this.tinChinhNews = newsViews;

        this.fixedTinChinhNews = newsViews.splice(0, 1)[0];

        this.newsViewsGroupByCategoryId[this.categoryId] = newsViews.splice(0, 10);

        (allNews && allNews.length) && (
            this.loadImages(allNews)
                .subscribe(images => this.imagesGroupByCategoryId[this.categoryId] = images)
        )
    }

    protected loadNewsViews(categoryId: string, max: number, offset: number): Observable<NewsView[]> {

        (isNullOrUndefined(offset)) && (offset = 0);

        let categoryIds = this.categoryService.getAllCategoryIdsByParentCategoryId(categoryId);

        return this.newsViewService.get({
            categoryIds: categoryIds, sort: "pubDate", order: "desc", max: max, offset: offset
        });
    }

    protected loadImages(newsViews: NewsView[]): Observable<Image[]> {

        let newsIds = newsViews ? newsViews.map(item => item.newsId) : null;

        return this.imageService.get({referenceIds: newsIds, referenceType: IMAGE_REFERENCE_TYPE_NEWS});
    }

}
