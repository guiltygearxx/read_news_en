import {RestService} from "../common/rest-service";
import {Injectable} from "@angular/core";
import {News} from "../bean/news";
import {HttpService} from "../common/http.service";

@Injectable()
export class NewsService extends RestService<News> {

  resource: string = "news";

  constructor(protected http: HttpService) {

    super(http);
  }
}
