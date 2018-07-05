import {Component, Input, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

    @Input()
    news: NewsView;

    @Input()
    image: Image;

    @Input()
    now: Date;

    constructor(protected router: Router,
                protected applicationUtils: ApplicationUtils) {
    }

    ngOnInit(): void {
    }

    viewNewsDetail($event: any): void {

        $event.preventDefault();

        let title: string = this.applicationUtils.convertTitleToURLParam(this.news.title);

        this.router.navigate(['/newsDetail/', title, this.news.id]).then();
    }
}
