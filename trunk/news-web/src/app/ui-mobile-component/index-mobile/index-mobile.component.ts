import {Component, OnInit} from '@angular/core';
import {NewsViewService} from "../../service/news-view.service";
import {ImageService} from "../../service/image.service";
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";
import {isNullOrUndefined} from "util";
import {CATEGORY_ID_TINCHINH, IMAGE_REFERENCE_TYPE_NEWS} from "../../common/application-constants";
import {Observable} from "rxjs/Observable";
import {CategoryService} from "../../service/category.service";

@Component({
    selector: 'app-index-mobile',
    templateUrl: './index-mobile.component.html',
    styleUrls: ['./index-mobile.component.css']
})
export class IndexMobileComponent implements OnInit {

    now: Date;

    /**
     * phần tin to nhất trên trang mobile;
     */
    fixedTinChinhNews: NewsView;

    tinChinhNews: NewsView[];

    newsViewsGroupByCategoryId: { [categoryId: string]: NewsView[] };

    loadingFlagByCategoryId: { [categoryId: string]: boolean };

    imagesGroupByCategoryId: { [categoryId: string]: Image[] };

    newsTinChinhOffset: number;

    isLoadingMoreTinChinh: boolean;

    /**
     * = true neu nhu so luong tin chinh load qua nhieu hoac khong con tin tuc de load nua;
     */
    stopLoadMoreTinChinh: boolean;

    constructor(protected newsViewService: NewsViewService,
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

    getTinChinhNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH];
    }

    getTinChinhNews2(index: number): NewsView {

        let news = this.fixedTinChinhNews;

        return news ? news[index] : null;
    }

    getTinChinhNews(index: number): NewsView {

        let news = this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH];

        return news ? news[index] : null;
    }

    getTinChinhNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_TINCHINH, news);
    }

    getNewsImage(categoryId: string, news: NewsView): Image {

        let images = this.imagesGroupByCategoryId[categoryId]

        let image = news && images ? images.find(item => item.referenceId == news.newsId) : null;

        return image;
    }

    showMore(): void {

        let newsList = this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH];

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

        return this._isLoading(CATEGORY_ID_TINCHINH);
    }

    protected loadMoreTinChinh(): void {

        this.stopLoadMoreTinChinh = true;

        this.loadNewsViews(CATEGORY_ID_TINCHINH, 50, this.newsTinChinhOffset).subscribe(newsViews => {

            newsViews.forEach((news) => this.tinChinhNews.push(news));

            this.newsTinChinhOffset += newsViews.length;

            /**
             * load qua nhieu tin tuc roi thi nen stop khong load nua || khong con tin tuc de load nua;
             */
            this.stopLoadMoreTinChinh = !newsViews.length || this.newsTinChinhOffset > 1000;

            this.isLoadingMoreTinChinh = false;

            (newsViews && newsViews.length) && (this.loadImages(newsViews).subscribe(images => {

                let tinChinhImages = this.imagesGroupByCategoryId[CATEGORY_ID_TINCHINH];

                images.forEach((image) => tinChinhImages.push(image));
            }));
        });
    }

    protected loadNewsByCategories(): void {

        [
            {categoryId: CATEGORY_ID_TINCHINH, max: 21, offset: 0},
        ].forEach(options => {

            let categoryId = options.categoryId;

            this.loadingFlagByCategoryId[categoryId] = true;

            this.loadNewsViews(categoryId, options.max, options.offset).subscribe(newsViews => {

                this.loadingFlagByCategoryId[categoryId] = false;

                switch (categoryId) {

                    case CATEGORY_ID_TINCHINH:
                        this.afterLoadTinChinhNews(newsViews);
                        break;
                }
            });
        });
    }

    protected afterLoadTinChinhNews(newsViews: NewsView[]): void {

        this.newsTinChinhOffset += newsViews.length;

        let allNews = newsViews.slice(0);

        this.tinChinhNews = newsViews;

        this.fixedTinChinhNews = newsViews.splice(0, 1)[0];

        this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH] = newsViews.splice(0, 10);

        (allNews && allNews.length) && (
            this.loadImages(allNews)
                .subscribe(images => this.imagesGroupByCategoryId[CATEGORY_ID_TINCHINH] = images)
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
