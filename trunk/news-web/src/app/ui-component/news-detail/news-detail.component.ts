import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../service/news.service";
import {News} from "../../bean/news";

declare var window: any;

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent
    implements OnInit, AfterContentInit, AfterViewChecked {

    protected id: string;

    protected news: News;

    protected redirectToNewsDetailFn: () => void;

    constructor(protected route: ActivatedRoute,
                protected newsService: NewsService) {
    }

    ngOnInit(): void {

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngAfterContentInit(): void {

        this.newsService.getById(this.id).subscribe((news) => {

            this.news = news;

            this.redirectToNewsDetailFn = () => this.redirectToNewsDetail();
        })
    }

    ngAfterViewChecked(): void {

        if (this.redirectToNewsDetailFn) {

            this.redirectToNewsDetailFn();

            this.redirectToNewsDetailFn = null;
        }
    }

    private redirectToNewsDetail(): void {

        window.location = this.news.link;
    }
}
