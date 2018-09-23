import {Component, Input} from '@angular/core';
import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";

/**
 * Generated class for the NewsCard_2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news-card-2',
  templateUrl: 'news-card-2.html'
})
export class NewsCard_2Component {

  @Input()
  news: NewsView;

  @Input()
  image: Image;

  @Input()
  now: Date;

  constructor() {
  }

}
