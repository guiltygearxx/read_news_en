import {Component, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {NewsViewService} from "../../service/news-view.service";
import {
    CATEGORY_ID_THOISU,
    CATEGORY_ID_TINCHINH,
    CATEGORY_ID_TINNOIBAT,
    CATEGORY_ID_TINNONG,
    CATEGORY_ID_VIDEO,
    IMAGE_REFERENCE_TYPE_NEWS
} from "../../common/application-constants";
import {ImageService} from "../../service/image.service";
import {Image} from "../../bean/image";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {FacebookService, InitParams, UIParams, UIResponse} from "ngx-facebook";
import {CategoryService} from "../../service/category.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    now: Date;

    /**loadingFlagByCategoryId
     * 7 tin tuc se hien o phan card chinh cua trang chu;
     */
    fixedTinChinhNews: NewsView[];

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
                private fb: FacebookService,
                protected categoryService: CategoryService) {

        let initParams: InitParams = {
            appId: '1234566778',
            xfbml: true,
            version: 'v2.8'
        };

        fb.init(initParams);
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

    getThoiSuNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_THOISU];
    }

    getVideoNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_VIDEO];
    }

    getTinNongNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_TINNONG];
    }

    getTinNoiBatNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_TINNOIBAT];
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

    getThoiSuNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_THOISU, news);
    }

    getVideoNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_VIDEO, news);
    }

    getTinNoiBatNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_TINNOIBAT, news);
    }

    getTinNongNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_TINNONG, news);
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

    isLoadingThoiSu(): boolean {

        return this._isLoading(CATEGORY_ID_THOISU);
    }

    isLoadingTinNoiBat(): boolean {

        return this._isLoading(CATEGORY_ID_TINNOIBAT);
    }

    isLoadingTinNong(): boolean {

        return this._isLoading(CATEGORY_ID_TINNONG);
    }

    isLoadingVideo(): boolean {

        return this._isLoading(CATEGORY_ID_VIDEO);
    }

    share(url: string) {

        let params: UIParams = {
            href: url,
            method: 'share'
        };

        this.fb.ui(params)
            .then((res: UIResponse) => console.log(res))
            .catch((e: any) => console.error(e));

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
            {categoryId: CATEGORY_ID_TINCHINH, max: 26, offset: 0},
            {categoryId: CATEGORY_ID_THOISU, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_TINNONG, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_TINNOIBAT, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_VIDEO, max: 20, offset: 0},
        ].forEach(options => {

            let categoryId = options.categoryId;

            this.loadingFlagByCategoryId[categoryId] = true;

            this.loadNewsViews(categoryId, options.max, options.offset).subscribe(newsViews => {

                this.loadingFlagByCategoryId[categoryId] = false;

                switch (categoryId) {

                    case CATEGORY_ID_TINCHINH:
                        this.afterLoadTinChinhNews(newsViews);
                        break;

                    case CATEGORY_ID_THOISU:

                        this.newsViewsGroupByCategoryId[categoryId] = newsViews;

                        (newsViews && newsViews.length) && (
                            this.loadImages(newsViews)
                                .subscribe(images => this.imagesGroupByCategoryId[categoryId] = images)
                        );

                        break;

                    case CATEGORY_ID_TINNONG:

                        this.newsViewsGroupByCategoryId[categoryId] = newsViews;

                        (newsViews && newsViews.length) && (
                            this.loadImages(newsViews)
                                .subscribe(images => this.imagesGroupByCategoryId[categoryId] = images)
                        );

                        break;
                    case CATEGORY_ID_TINNOIBAT:

                        this.newsViewsGroupByCategoryId[categoryId] = newsViews;

                        (newsViews && newsViews.length) && (
                            this.loadImages(newsViews)
                                .subscribe(images => this.imagesGroupByCategoryId[categoryId] = images)
                        );

                        break;

                    case CATEGORY_ID_VIDEO:

                        this.newsViewsGroupByCategoryId[categoryId] = newsViews;

                        (newsViews && newsViews.length) && (
                            this.loadImages(newsViews)
                                .subscribe(images => this.imagesGroupByCategoryId[categoryId] = images)
                        );

                        break;
                }
            });
        });
    }

    protected afterLoadTinChinhNews(newsViews: NewsView[]): void {

        this.newsTinChinhOffset += newsViews.length;

        let allNews = newsViews.slice(0);

        this.tinChinhNews = newsViews;

        this.fixedTinChinhNews = newsViews.splice(0, 6);

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
