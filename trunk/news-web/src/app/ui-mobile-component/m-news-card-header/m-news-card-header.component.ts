import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {
    newsCardAppearAnimation,
    SupportNewsCardAppearAnimation
} from "../../ui-component/common/news-card-appear-animation";
import {Router} from "@angular/router";
import {NewsCardCommon} from "../../ui-component/common/news-card-common";
import {Image} from "../../bean/image";
import {ApplicationUtils} from "../../common/application-utils";
import {TIMEOUT_APPLY_EFFECT} from "../../common/application-constants";
import {NewsView} from "../../bean/news-view";

@Component({
    selector: 'app-m-news-card-header',
    templateUrl: './m-news-card-header.component.html',
    styleUrls: ['./m-news-card-header.component.css'],
    animations: [newsCardAppearAnimation]
})
export class MNewsCardHeaderComponent
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
