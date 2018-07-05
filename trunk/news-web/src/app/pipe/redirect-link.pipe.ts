import {Pipe, PipeTransform} from "@angular/core";
import {ApplicationUtils} from "../common/application-utils";
import {NewsView} from "../bean/news-view";

@Pipe({name: 'redirectLink'})
export class RedirectLinkPipe implements PipeTransform {

    constructor(protected applicationUtils: ApplicationUtils) {
    }

    transform(value: any, ...args: any[]): any {

        let news: NewsView = value;

        let title = this.applicationUtils.convertTitleToURLParam(news.title);

        title = title.split(" ").join("-");

        return "/newsDetail/" + title + "/" + news.id;
    }
}