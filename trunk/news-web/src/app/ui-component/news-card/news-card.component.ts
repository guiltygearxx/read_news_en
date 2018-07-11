import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";
import {TIMEOUT_APPLY_EFFECT} from "../../common/application-constants";
import {newsCardAppearAnimation, SupportNewsCardAppearAnimation} from "../common/news-card-appear-animation";
import {NewsCardCommon} from "../common/news-card-common";

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.css'],
    animations: [newsCardAppearAnimation]
})
export class NewsCardComponent
    implements OnInit, AfterContentInit, SupportNewsCardAppearAnimation, NewsCardCommon {

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

        this.applicationUtils.viewNewsDetail(this);
    }

    ngAfterContentInit(): void {

        setTimeout(() => this.readyState = "yes", TIMEOUT_APPLY_EFFECT);
    }
}
