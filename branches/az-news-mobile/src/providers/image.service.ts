import {RestService} from "../common/rest-service";
import {Image} from "../bean/image";
import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";

@Injectable()
export class ImageService extends RestService<Image> {

  resource: string = "image";

  constructor(protected http: HttpService) {

    super(http);
  }
}
