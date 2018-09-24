import {Pipe, PipeTransform} from '@angular/core';
import {ApplicationUtils} from "../common/application-utils";
import {environment} from "../../environments/environment";
import {NewsView} from "../bean/news-view";

@Pipe({
    name: 'redirectLinkMobile'
})
export class RedirectLinkMobilePipe implements PipeTransform {

    constructor(protected applicationUtils: ApplicationUtils) {
    }

    transform(value: any, ...args: any[]): any {

        let news: NewsView = value;

        if (!news) return null;

        let title = this.applicationUtils.convertTitleToURLParam(news.title);

        title = title.split(" ").join("-");

        return environment.prefixDomain + "/mobile/noiDung2/" + title + "/" + news.newsId;
    }
}
