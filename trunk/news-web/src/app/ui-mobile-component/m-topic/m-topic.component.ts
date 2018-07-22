import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Image} from "../../bean/image";
import {NewsViewService} from "../../service/news-view.service";
import {NewsView} from "../../bean/news-view";
import {Observable} from "rxjs/Observable";
import {ImageService} from "../../service/image.service";
import {
    CATEGORY_ID_THOISU,
    CATEGORY_ID_TINCHINH,
    CATEGORY_ID_TINNOIBAT, CATEGORY_ID_TINNONG,
    CATEGORY_ID_VIDEO, CATEGORY_NAME_CHUDE, CATEGORY_NAME_TINMOI, CATEGORY_NAME_TINNONG, CATEGORY_NAME_VIDEO,
    IMAGE_REFERENCE_TYPE_NEWS
} from "../../common/application-constants";

@Component({
    selector: 'app-m-topic',
    templateUrl: './m-topic.component.html',
    styleUrls: ['./m-topic.component.css']
})
export class MTopicComponent implements OnInit, AfterContentChecked {

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

    tinChinhTopic: string;

    /**
     * = true neu nhu so luong tin chinh load qua nhieu hoac khong con tin tuc de load nua;
     */
    stopLoadMoreTinChinh: boolean;

    constructor(private router: Router,
                protected route: ActivatedRoute,
                protected newsViewService: NewsViewService,
                protected imageService: ImageService) {
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

        let currentNewsName: string = this.route.snapshot.paramMap.get("idTopic");

        switch (currentNewsName) {
            case CATEGORY_NAME_TINNONG:
                this.tinChinhTopic = CATEGORY_ID_TINNONG;
                break;
            case CATEGORY_NAME_TINMOI:
                this.tinChinhTopic = CATEGORY_ID_TINNOIBAT;
                break;
            case CATEGORY_NAME_VIDEO:
                this.tinChinhTopic = CATEGORY_ID_VIDEO;
                break;
            case CATEGORY_NAME_CHUDE:
                this.tinChinhTopic = CATEGORY_ID_TINNONG;
                break;
        }
    }

    getTinChinhNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[this.tinChinhTopic];
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

        let news = this.newsViewsGroupByCategoryId[this.tinChinhTopic];

        return news ? news[index] : null;
    }

    getTinChinhNewsImage(news: NewsView): Image {

        return this.getNewsImage(this.tinChinhTopic, news);
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

        let newsList = this.newsViewsGroupByCategoryId[this.tinChinhTopic];

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

        return this._isLoading(this.tinChinhTopic);
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

    protected loadMoreTinChinh(): void {

        this.stopLoadMoreTinChinh = true;

        this.loadNewsViews(this.tinChinhTopic, 50, this.newsTinChinhOffset).subscribe(newsViews => {

            newsViews.forEach((news) => this.tinChinhNews.push(news));

            this.newsTinChinhOffset += newsViews.length;

            /**
             * load qua nhieu tin tuc roi thi nen stop khong load nua || khong con tin tuc de load nua;
             */
            this.stopLoadMoreTinChinh = !newsViews.length || this.newsTinChinhOffset > 1000;

            this.isLoadingMoreTinChinh = false;

            (newsViews && newsViews.length) && (this.loadImages(newsViews).subscribe(images => {

                let tinChinhImages = this.imagesGroupByCategoryId[this.tinChinhTopic];

                images.forEach((image) => tinChinhImages.push(image));
            }));
        });
    }

    protected loadNewsByCategories(): void {

        [
            {categoryId: this.tinChinhTopic, max: 26, offset: 0},
            {categoryId: CATEGORY_ID_THOISU, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_TINNONG, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_TINNOIBAT, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_VIDEO, max: 5, offset: 0},
        ].forEach(options => {

            let categoryId = options.categoryId;

            this.loadingFlagByCategoryId[categoryId] = true;

            this.loadNewsViews(categoryId, options.max, options.offset).subscribe(newsViews => {

                this.loadingFlagByCategoryId[categoryId] = false;

                switch (categoryId) {

                    case this.tinChinhTopic:
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

        this.newsViewsGroupByCategoryId[this.tinChinhTopic] = newsViews.splice(0, 10);

        (allNews && allNews.length) && (
            this.loadImages(allNews)
                .subscribe(images => this.imagesGroupByCategoryId[this.tinChinhTopic] = images)
        )
    }

    protected loadNewsViews(categoryId: string, max: number, offset: number): Observable<NewsView[]> {

        (isNullOrUndefined(offset)) && (offset = 0);

        return this.newsViewService.get({
            categoryId: categoryId, sort: "pubDate", order: "desc", max: max, offset: offset
        });
    }

    protected loadImages(newsViews: NewsView[]): Observable<Image[]> {

        let newsIds = newsViews ? newsViews.map(item => item.newsId) : null;

        return this.imageService.get({referenceIds: newsIds, referenceType: IMAGE_REFERENCE_TYPE_NEWS});
    }

}
