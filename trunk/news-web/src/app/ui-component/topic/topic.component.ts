import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {NewsViewService} from "../../service/news-view.service";
import {
    CATEGORY_ID_THOISU,
    CATEGORY_ID_TINCHINH,
    CATEGORY_ID_TINNONG,
    CATEGORY_ID_VIDEO,
    IMAGE_REFERENCE_TYPE_NEWS
} from "../../common/application-constants";
import {ImageService} from "../../service/image.service";
import {Image} from "../../bean/image";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, AfterContentChecked {

    now: Date;

    /**
     * 7 tin tuc se hien o phan card chinh cua trang chu;
     */
    fixedTinChinhNews: NewsView[];

    fixedTinChinhNews2: NewsView;

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

    categoryId: string;

    constructor(protected newsViewService: NewsViewService,
                protected imageService: ImageService,
                protected route: ActivatedRoute,) {
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

            this.loadTinChinhNews();
        }
    }

    getTinChinhNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[this.categoryId];
    }

    getThoiSuNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_THOISU];
    }

    getTinNongNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_TINNONG];
    }

    getVideoNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_VIDEO];
    }

    getTinChinhNews2(index: number): NewsView {

        let news = this.fixedTinChinhNews;

        return news ? news[index] : null;
    }

    getTinChinhNews(index: number): NewsView {

        let news = this.newsViewsGroupByCategoryId[this.categoryId];

        return news ? news[index] : null;
    }

    getTinChinhNewsImage(news: NewsView): Image {

        return this.getNewsImage(this.categoryId, news);
    }

    getThoiSuNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_THOISU, news);
    }

    getTinNongNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_TINNONG, news);
    }

    getVideoNewsImage(news: NewsView): Image {

        return this.getNewsImage(CATEGORY_ID_VIDEO, news);
    }

    getNewsImage(categoryId: string, news: NewsView): Image {

        if (isNullOrUndefined(news)) return null;

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

        [
            {categoryId: CATEGORY_ID_THOISU, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_TINNONG, max: 5, offset: 0},
            {categoryId: CATEGORY_ID_VIDEO, max: 5, offset: 0},
        ].forEach(options => {

            let categoryId = options.categoryId;

            this.loadingFlagByCategoryId[categoryId] = true;

            this.loadNewsViews(categoryId, options.max, options.offset).subscribe(newsViews => {

                this.loadingFlagByCategoryId[categoryId] = false;

                switch (categoryId) {

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

    protected loadTinChinhNews(): void {

        let categoryId = this.categoryId;

        this.loadingFlagByCategoryId[categoryId] = true;

        this.loadNewsViews(categoryId, 27, 0).subscribe(newsViews => {

            this.loadingFlagByCategoryId[categoryId] = false;

            this.afterLoadTinChinhNews(newsViews);
        });
    }

    protected afterLoadTinChinhNews(newsViews: NewsView[]): void {

        this.newsTinChinhOffset += newsViews.length;

        let allNews = newsViews.slice(0);

        this.tinChinhNews = newsViews;

        this.fixedTinChinhNews2 = newsViews.splice(0, 1)[0];

        this.fixedTinChinhNews = newsViews.splice(0, 6);

        this.newsViewsGroupByCategoryId[this.categoryId] = newsViews.splice(0, 10);

        (allNews && allNews.length) && (
            this.loadImages(allNews)
                .subscribe(images => this.imagesGroupByCategoryId[this.categoryId] = images)
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
