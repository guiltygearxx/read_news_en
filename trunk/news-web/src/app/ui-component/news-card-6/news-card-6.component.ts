import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../bean/image";
import {NewsView} from "../../bean/news-view";

@Component({
    selector: 'app-news-card-6',
    templateUrl: './news-card-6.component.html',
    styleUrls: ['./news-card-6.component.css']
})
export class NewsCard6Component implements OnInit {

    @Input()
    news: NewsView;

    @Input()
    image: Image;

    @Input()
    now: Date;

    constructor() {
    }

    ngOnInit(): void {
    }
}
