import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

/*
  Generated class for the HttpService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const environment = {

  serviceBaseURL: "http://192.168.11.2:8080/",
}

@Injectable()
export class HttpService {

  constructor(protected http: HttpClient) {
  }

  private buildHttpHeader(httpHeaders: HttpHeaders): HttpHeaders {

    return httpHeaders;
  }

  private initParams(params: any): any {

    let params_ = {};

    if (params) {

      Object.keys(params).forEach((key) => {

        let value = params[key];

        if (value) params_[key] = value;
      });
    }

    return params_;
  }

  get(url: string, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.get<any>(url, {params: this.initParams(params), responseType: 'json', headers: httpHeaders});
  }

  post(url: string, body: any, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.post<any>(url, body, {
      params: this.initParams(params),
      responseType: 'json',
      headers: httpHeaders
    });
  }

  put(url: string, body: any, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.put<any>(url, body, {
      params: this.initParams(params),
      responseType: 'json',
      headers: httpHeaders
    });
  }

  delete(url: string, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.delete<any>(url, {
      params: this.initParams(params),
      responseType: 'json',
      headers: httpHeaders
    });
  }

}
