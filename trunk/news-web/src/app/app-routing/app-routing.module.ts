import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IndexComponent} from "../ui-component/index/index.component";
import {TopicComponent} from "../ui-component/topic/topic.component";
import {NewsDetailComponent} from "../ui-component/news-detail/news-detail.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', redirectTo: 'trangChu', pathMatch: 'full'},
            {path: 'trangChu', component: IndexComponent},
            {path: 'newsDetail/:title/:id', component: NewsDetailComponent},
            {path: 'chuDe/:categoryId', component: TopicComponent}
        ])
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
