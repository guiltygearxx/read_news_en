import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './ui-component/header/header.component';
import { FooterComponent } from './ui-component/footer/footer.component';
import { ContentComponent } from './ui-component/content/content.component';
import { IndexComponent } from './ui-component/index/index.component';
import { TopicComponent } from './ui-component/topic/topic.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    IndexComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
