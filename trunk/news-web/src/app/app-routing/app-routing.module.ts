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
                    {path: 'chuDe/:categoryId', component: TopicComponent}
                ],
            },

            {
                path: 'mobile', component: MobileComponent,
                canActivate: [MobileCanActivate],
                children: [

                    {path: '', redirectTo: 'trangChu', pathMatch: 'full'},
                    {path: 'trangChu', component: IndexMobileComponent},
                    {path: 'chuyenMuc', component: MTopicComponent},
                ],
            },

            {path: 'newsDetail/:title/:id', component: NewsDetailComponent},
            {path: 'chuyenMuc/:idTopic', component: MTopicComponent}
        ])
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
