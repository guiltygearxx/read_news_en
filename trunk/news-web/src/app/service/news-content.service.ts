import {Injectable} from "@angular/core";
import {RestService} from "../common/rest-service";
import {HttpService} from "../common/http.service";
import {NewsContent} from "../bean/news-content";

@Injectable()
export class NewsContentService extends RestService<NewsContent> {

    resource: string = "newsContent";

    constructor(protected http: HttpService) {

        super(http);
    }
}