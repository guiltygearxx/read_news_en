import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";
import {NewsCardCommon} from "../common/news-card-common";
import {ApplicationUtils} from "../../common/application-utils";
import {Router} from "@angular/router";
import {newsCardAppearAnimation, SupportNewsCardAppearAnimation} from "../common/news-card-appear-animation";
import {TIMEOUT_APPLY_EFFECT} from "../../common/application-constants";

@Component({
    selector: 'app-news-card-video-small',
    templateUrl: './news-card-video-small.component.html',
    styleUrls: ['./news-card-video-small.component.css'],
    animations: [newsCardAppearAnimation]
})
export class NewsCardVideoSmallComponent
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