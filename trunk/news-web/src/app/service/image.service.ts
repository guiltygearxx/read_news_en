import {RestService} from "../common/rest-service";
import {Image} from "../bean/image";
import {HttpService} from "../common/http.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ImageService extends RestService<Image> {

    resource: string = "image";

    constructor(protected http: HttpService) {

        super(http);
    }
}