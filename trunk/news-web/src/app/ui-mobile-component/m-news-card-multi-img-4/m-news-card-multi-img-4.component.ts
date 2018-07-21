import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
    newsCardAppearAnimation,
    SupportNewsCardAppearAnimation
} from "../../ui-component/common/news-card-appear-animation";
import {NewsCardCommon} from "../../ui-component/common/news-card-common";
import {Image} from "../../bean/image";
import {ApplicationUtils} from "../../common/application-utils";
import {TIMEOUT_APPLY_EFFECT} from "../../common/application-constants";
import {NewsView} from "../../bean/news-view";

@Component({
    selector: 'app-m-news-card-multi-img-4',
    templateUrl: './m-news-card-multi-img-4.component.html',
    styleUrls: ['./m-news-card-multi-img-4.component.css'],
    animations: [newsCardAppearAnimation]

})
export class MNewsCardMultiImg4Component implements OnInit, AfterContentInit, SupportNewsCardAppearAnimation, NewsCardCommon {

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
