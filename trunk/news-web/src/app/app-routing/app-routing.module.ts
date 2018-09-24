import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IndexComponent} from "../ui-component/index/index.component";
import {TopicComponent} from "../ui-component/topic/topic.component";
import {NewsDetailComponent} from "../ui-component/news-detail/news-detail.component";
import {DesktopComponent} from "../ui-component/desktop/desktop.component";
import {MobileComponent} from "../ui-mobile-component/mobile/mobile.component";
import {IndexMobileComponent} from "../ui-mobile-component/index-mobile/index-mobile.component";
import {DesktopCanActivate} from "./desktop-can-activate";
import {MobileCanActivate} from "./mobile-can-activate";
import {MTopicComponent} from "../ui-mobile-component/m-topic/m-topic.component";
import {MDetailComponent} from "../ui-mobile-component/m-detail/m-detail.component";
import {MDetail2Component} from "../ui-mobile-component/m-detail-2/m-detail-2.component";

@NgModule({
    imports: [
        RouterModule.forRoot([

            {path: '', redirectTo: 'desktop', pathMatch: 'full'},

            {
                path: 'desktop', component: DesktopComponent,
                canActivate: [DesktopCanActivate],
                children: [

                    {path: '', redirectTo: 'trangChu', pathMatch: 'full'},
                    {path: 'trangChu', component: IndexComponent},
                    {path: 'chuDe/:categoryCode/:categoryId', component: TopicComponent},
                    {path: 'noiDung/:title/:id', component: NewsDetailComponent},
                ],
            },

            {
                path: 'mobile', component: MobileComponent,
                canActivate: [MobileCanActivate],
                children: [

                    {path: '', redirectTo: 'trangChu', pathMatch: 'full'},
                    {path: 'trangChu', component: IndexMobileComponent},
                    {path: 'chuDe/:categoryCode/:categoryId', component: MTopicComponent},
                    {path: 'noiDung/:title/:id', component: MDetailComponent},
                    {path: 'noiDung2/:title/:id', component: MDetail2Component},
                ],
            },
        ])
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
