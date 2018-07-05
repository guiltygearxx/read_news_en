import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsViewService} from "../../service/news-view.service";
import {NewsView} from "../../bean/news-view";

declare var window: any;

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent
    implements OnInit, AfterContentChecked, AfterViewChecked {

    protected id: string;

    protected news: NewsView;

    protected redirectToNewsDetailFn: () => void;

    constructor(protected route: ActivatedRoute,
                protected newsViewService: NewsViewService) {
    }

    ngOnInit(): void {

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngAfterContentChecked(): void {

        this.newsViewService.getById(this.id).subscribe((news) => {

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

        alert("1");

        window.location = this.news.link;
    }
}
