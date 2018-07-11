import {NewsView} from "../../bean/news-view";
import {Image} from "../../bean/image";

export interface NewsCardCommon {

    news: NewsView;

    image: Image;

    now: Date;
}