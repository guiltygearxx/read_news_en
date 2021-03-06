import {Observable} from 'rxjs/Observable';
import {HttpService} from "./http.service";

export class RestService<T> {

  resource: string;

  constructor(protected httpService: HttpService) {
  }

  get(params?: any): Observable<T[]> {

    return this.httpService.get(this.resource, params);
  }

  getById(id: any): Observable<T> {

    return this.httpService.get(this.resource + '/' + id.toString() + '.json', null);
  }

  post(domain: T): Observable<T> {

    return this.httpService.post(this.resource + '.json', domain, null);
  }

  put(domain: T, id: any): Observable<T> {

    return this.httpService.put(this.resource + '/' + id.toString() + '.json', domain, null);
  }

  delete(id: any): Observable<T> {

    return this.httpService.delete(this.resource + '/' + id.toString() + '.json', null);
  }

}
