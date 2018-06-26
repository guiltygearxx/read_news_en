import {Component, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {NewsViewService} from "../../service/news-view.service";
import {CATEGORY_ID_THOISU, CATEGORY_ID_TINCHINH, IMAGE_REFERENCE_TYPE_NEWS} from "../../common/application-constants";
import {ImageService} from "../../service/image.service";
import {Image} from "../../bean/image";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    now: Date;

    /**
     * 7 tin tuc se hien o phan card chinh cua trang chu;
     */
    fixedTinChinhNews: NewsView[];

    newsViewsGroupByCategoryId: { [categoryId: string]: NewsView[] };

    imagesGroupByCategoryId: { [categoryId: string]: Image[] };

    constructor(protected newsViewService: NewsViewService,
                protected imageService: ImageService) {
    }

    ngOnInit(): void {

        this.now = new Date();

        this.newsViewsGroupByCategoryId = {};

        this.imagesGroupByCategoryId = {};

        this.loadNewsByCategories();
    }

    getTinChinhNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH];
    }

    getThoiSuNewsList(): NewsView[] {

        return this.newsViewsGroupByCategoryId[CATEGORY_ID_THOISU];
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

    getNewsImage(categoryId: string, news: NewsView): Image {

        let images = this.imagesGroupByCategoryId[categoryId]

        let image = news && images ? images.find(item => item.referenceId == news.newsId) : null;

        return image;
    }

    protected loadNewsByCategories(): void {

        [
            {categoryId: CATEGORY_ID_TINCHINH, max: 100},
            {categoryId: CATEGORY_ID_THOISU, max: 5},
        ].forEach(options => {

            let categoryId = options.categoryId;

            this.loadNewsViews(categoryId, options.max).subscribe(newsViews => {

                switch (categoryId) {

                    case CATEGORY_ID_TINCHINH:
                        this.afterLoadTinChinhNews(newsViews);
                        break;

                    case CATEGORY_ID_THOISU:
                        this.loadImages(this.newsViewsGroupByCategoryId[categoryId] = newsViews)
                            .subscribe(images => this.imagesGroupByCategoryId[categoryId] = images);
                        break;
                }
            });
        });
    }

    protected afterLoadTinChinhNews(newsViews: NewsView[]): void {

        console.log("afterLoadTinChinhNews");

        console.log(newsViews.length);

        let allNews = newsViews.slice(0);

        if (newsViews && newsViews.length >= 6) {

            this.fixedTinChinhNews = newsViews.splice(0, 6);

            console.log(this.fixedTinChinhNews.length);
        }

        this.newsViewsGroupByCategoryId[CATEGORY_ID_TINCHINH] = newsViews;

        console.log(newsViews.length);

        this.loadImages(allNews)
            .subscribe(images => this.imagesGroupByCategoryId[CATEGORY_ID_TINCHINH] = images);
    }

    protected loadNewsViews(categoryId: string, max: number): Observable<NewsView[]> {

        return this.newsViewService.get({categoryId: categoryId, sort: "pubDate", order: "desc", max: max});
    }

    protected loadImages(newsViews: NewsView[]): Observable<Image[]> {

        let newsIds = newsViews ? newsViews.map(item => item.newsId) : null;

        return this.imageService.get({referenceIds: newsIds, referenceType: IMAGE_REFERENCE_TYPE_NEWS});
    }
}
