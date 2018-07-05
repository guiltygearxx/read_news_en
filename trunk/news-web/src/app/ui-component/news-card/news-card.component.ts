import {AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.css'],
    animations: [
        trigger("readyStateChanged", [
            state('yes', style({opacity: 0})),
            state('no', style({opacity: 1})),
            transition('* => *', animate('0.5s'))
        ])
    ]
})
export class NewsCardComponent implements OnInit, AfterViewInit {

    @Input()
    news: NewsView;

    @Input()
    image: Image;

    @Input()
    now: Date;

    readyState: string = "no";

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

    ngAfterViewInit(): void {

        this.readyState = "yes";
    }
}
