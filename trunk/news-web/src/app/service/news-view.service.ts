import {RestService} from "../common/rest-service";
import {NewsView} from "../bean/news-view";
import {HttpService} from "../common/http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class NewsViewService extends RestService<NewsView> {

    resource: string = "newsView";

    constructor(protected http: HttpService) {

        super(http);
    }
}