import {AfterContentChecked, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsContentService} from "../../service/news-content.service";
import {NewsContent} from "../../bean/news-content";
import {NewsService} from "../../service/news.service";
import {News} from "../../bean/news";

@Component({
    selector: 'app-m-detail',
    templateUrl: './m-detail.component.html',
    styleUrls: ['./m-detail.component.css']
})
export class MDetailComponent implements AfterContentChecked {

    id: string;

    news: News;

    newsContent: NewsContent;

    constructor(protected route: ActivatedRoute,
                protected newsService: NewsService,
                protected newsContentService: NewsContentService) {
    }

    innerContentNews: string;

    ngAfterContentChecked(): void {

        let id: string = this.route.snapshot.paramMap.get('id');

        if (id != this.id) {

            this.id = id;

            id && this.loadNews();
        }
    }

    private loadNews(): void {

        this.newsService.getById(this.id).subscribe((newsView) => this.news = newsView);

        this.newsContentService.getById(this.id).subscribe((newsContent) => this.newsContent = newsContent);
    }
}
