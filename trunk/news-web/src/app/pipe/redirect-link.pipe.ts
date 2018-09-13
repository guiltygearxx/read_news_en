import {Pipe, PipeTransform} from "@angular/core";
import {ApplicationUtils} from "../common/application-utils";
import {NewsView} from "../bean/news-view";
import {environment} from "../../environments/environment";

@Pipe({name: 'redirectLink'})
export class RedirectLinkPipe implements PipeTransform {

    constructor(protected applicationUtils: ApplicationUtils) {
    }

    transform(value: any, ...args: any[]): any {

        let news: NewsView = value;

        if (!news) return null;

        let title = this.applicationUtils.convertTitleToURLParam(news.title);

        title = title.split(" ").join("-");

        return "desktop/noiDung/" + title + "/" + news.newsId;
    }
}