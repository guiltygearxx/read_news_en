import {RestService} from "../common/rest-service";
import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {Category} from "../bean/category";

@Injectable()
export class CategoryService extends RestService<Category> {

  resource: string = "category";

  categories: Category[];

  constructor(protected http: HttpService) {

    super(http);
  }
}
