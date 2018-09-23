import { NgModule } from '@angular/core';
import { NewsCard_1Component } from './news-card-1/news-card-1';
import { NewsCard_2Component } from './news-card-2/news-card-2';
@NgModule({
	declarations: [NewsCard_1Component,
    NewsCard_2Component],
	imports: [],
	exports: [NewsCard_1Component,
    NewsCard_2Component]
})
export class ComponentsModule {}
