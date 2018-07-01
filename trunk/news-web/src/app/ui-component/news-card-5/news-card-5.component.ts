import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../bean/image";
import {NewsView} from "../../bean/news-view";

@Component({
    selector: 'app-news-card-5',
    templateUrl: './news-card-5.component.html',
    styleUrls: ['./news-card-5.component.css']
})
export class NewsCard5Component implements OnInit {

    @Input()
    news: NewsView;

    @Input()
    image: Image;

    @Input()
    now: Date;

    constructor() {
    }

    ngOnInit(): void {

        this.news.typeContent = "video";
    }
}

