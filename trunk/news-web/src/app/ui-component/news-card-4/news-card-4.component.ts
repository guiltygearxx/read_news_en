import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Image} from "../../bean/image";
import {NewsView} from "../../bean/news-view";
import {NewsCardCommon} from "../common/news-card-common";
import {ApplicationUtils} from "../../common/application-utils";
import {Router} from "@angular/router";
import {newsCardAppearAnimation, SupportNewsCardAppearAnimation} from "../common/news-card-appear-animation";
import {TIMEOUT_APPLY_EFFECT} from "../../common/application-constants";
import {FacebookService, InitParams, UIParams, UIResponse} from "ngx-facebook";

@Component({
    selector: 'app-news-card-4',
    templateUrl: './news-card-4.component.html',
    styleUrls: ['./news-card-4.component.css'],
    animations: [newsCardAppearAnimation]
})
export class NewsCard4Component
    implements OnInit, AfterContentInit, SupportNewsCardAppearAnimation, NewsCardCommon {

    @Input()
    news: NewsView;

    @Input()
    image: Image;

    @Input()
    now: Date;

    readyState: string = "no";

    constructor(protected router: Router,
                protected applicationUtils: ApplicationUtils,
                private fb: FacebookService) {

        let initParams: InitParams = {
            appId: '1234566778',
            xfbml: true,
            version: 'v2.8'
        };

        fb.init(initParams);
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

    share(url: string) {

        let params: UIParams = {
            href: url,
            method: 'share'
        };

        this.fb.ui(params)
            .then((res: UIResponse) => console.log(res))
            .catch((e: any) => console.error(e));

    }
}