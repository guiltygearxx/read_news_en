import {Component, Input, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";

@Component({
  selector: 'app-news-card-video-small',
  templateUrl: './news-card-video-small.component.html',
  styleUrls: ['./news-card-video-small.component.css']
})
export class NewsCardVideoSmallComponent implements OnInit {

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
