import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SuperTabsModule} from "ionic2-super-tabs";
import {TrangChuPage} from "../pages/trang-chu/trang-chu";
import {ChuDePage} from "../pages/chu-de/chu-de";
import {HomePage} from "../pages/home/home";
import {HttpService} from '../common/http.service';
import {ImageService} from "../providers/image.service";
import {NewsService} from "../providers/news.service";
import {NewsContentService} from "../providers/news-content.service";
import {NewsViewService} from "../providers/news-view.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CategoryService} from "../providers/category.service";
import {NewsCard_1Component} from "../components/news-card-1/news-card-1";
import {NewsCard_2Component} from "../components/news-card-2/news-card-2";
import {DisplayNewsTimePipe} from "../pipes/display-news-time";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ScrollHideDirective} from "../directives/scroll-hide";

export function setTranslateLoader(http: HttpClient) {

  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({

  declarations: [
    MyApp,
    HomePage,
    TrangChuPage,
    ChuDePage,
    NewsCard_1Component,
    NewsCard_2Component,
    DisplayNewsTimePipe,
    ScrollHideDirective
  ],

  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    TrangChuPage,
    ChuDePage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    ImageService,
    NewsService,
    NewsContentService,
    NewsViewService,
    CategoryService,
    InAppBrowser
  ]
})
export class AppModule {
}
