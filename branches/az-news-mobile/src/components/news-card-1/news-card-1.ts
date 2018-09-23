import {Component, Input} from '@angular/core';
import {Image} from "../../bean/image";
import {NewsView} from "../../bean/news-view";

/**
 * Generated class for the NewsCard_1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news-card-1',
  templateUrl: 'news-card-1.html'
})
export class NewsCard_1Component {

  @Input()
  news: NewsView;

  @Input()
  image: Image;

  @Input()
  now: Date;

  constructor() {
  }


}
