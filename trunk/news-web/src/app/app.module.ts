import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './ui-component/header/header.component';
import {FooterComponent} from './ui-component/footer/footer.component';
import {ContentComponent} from './ui-component/content/content.component';
import {IndexComponent} from './ui-component/index/index.component';
import {TopicComponent} from './ui-component/topic/topic.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {NewsViewService} from "./service/news-view.service";
import {HttpService} from "./common/http.service";
import {AppBaseModule} from "./common/app-base.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {DateFormatter} from "./common/formater/date-formatter";
import {NumberFormatter} from "./common/formater/number-formatter";
import {ApplicationUtils} from "./common/application-utils";
import {ComponentUtils} from "./common/component-utils";
import {ValidateUtils} from "./common/validate/validate-utils";
import {SortableTableFlow} from "./common/sortable-table-flow";
import {ApplicationService} from "./common/application.service";
import {StorageService} from "./common/storage.service";
import {LoginActivateGuard} from "./common/login-activate-guard";
import {AuthActivateGuard} from "./common/auth-activate-guard";
import {ImageService} from "./service/image.service";
import {DisplayNewsTimePipe} from "./pipe/display-news-time.pipe";
import {NewsCardComponent} from './ui-component/news-card/news-card.component';
import {NewsCard2Component} from './ui-component/news-card-2/news-card-2.component';
import {NewsCard3Component} from './ui-component/news-card-3/news-card-3.component';
import {NewsCard4Component} from './ui-component/news-card-4/news-card-4.component';
import {NewsCard5Component} from './ui-component/news-card-5/news-card-5.component';
import {NewsCard6Component} from './ui-component/news-card-6/news-card-6.component';
import {NewsCardVideoSmallComponent} from './ui-component/news-card-video-small/news-card-video-small.component';
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {NewsLoadingCardComponent} from './ui-component/news-loading-card/news-loading-card.component';
import {NewsLoadingCard2Component} from './ui-component/news-loading-card-2/news-loading-card-2.component';
import {NewsLoadingCard4Component} from './ui-component/news-loading-card-4/news-loading-card-4.component';
import {NewsLoadingCard3Component} from './ui-component/news-loading-card-3/news-loading-card-3.component';
import {NewsLoadingCard5Component} from './ui-component/news-loading-card-5/news-loading-card-5.component';
import {NewsDetailComponent} from './ui-component/news-detail/news-detail.component';
import {RedirectLinkPipe} from "./pipe/redirect-link.pipe";
import {NewCardCarouselComponent} from './ui-component/new-card-carousel/new-card-carousel.component';
import {NewsLoadingCard6Component} from './ui-component/news-loading-card-6/news-loading-card-6.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        IndexComponent,
        TopicComponent,
        DisplayNewsTimePipe,
        RedirectLinkPipe,
        NewsCardComponent,
        NewsCard2Component,
        NewsCard3Component,
        NewsCard4Component,
        NewsCard5Component,
        NewsCard6Component,
        NewsCardVideoSmallComponent,
        NewsLoadingCardComponent,
        NewsLoadingCard2Component,
        NewsLoadingCard4Component,
        NewsLoadingCard3Component,
        NewsLoadingCard5Component,
        NewsDetailComponent,
        NewCardCarouselComponent,
        NewsLoadingCard6Component,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        AppBaseModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        InfiniteScrollModule,
    ],
    providers: [
        NewsViewService,
        HttpService,
        DateFormatter,
        NumberFormatter,
        ApplicationUtils,
        ComponentUtils,
        ValidateUtils,
        SortableTableFlow,
        ApplicationService,
        StorageService,
        LoginActivateGuard,
        AuthActivateGuard,
        ImageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
