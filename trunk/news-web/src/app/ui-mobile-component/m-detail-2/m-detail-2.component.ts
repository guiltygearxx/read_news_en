import {AfterContentInit, Component, OnInit} from '@angular/core';
import {News} from "../../bean/news";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../service/news.service";

declare var window: any;

@Component({
    selector: 'app-m-detail-2',
    templateUrl: './m-detail-2.component.html',
    styleUrls: ['./m-detail-2.component.css']
})
export class MDetail2Component implements OnInit, AfterContentInit {

    id: string;

    news: News;

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
