import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';
import {environment} from '../../environments/environment';
import {AUTHENTICATION_TYPE} from './application-constants';
import {ApplicationService} from './application.service';

@Injectable()
export class HttpService {

  constructor(protected http: HttpClient,
              protected applicationService: ApplicationService) {
  }

  private buildHttpHeader(httpHeaders: HttpHeaders): HttpHeaders {

    let accessToken = this.applicationService.accessToken;

    if (!isNullOrUndefined(accessToken))
      httpHeaders = httpHeaders.set(AUTHENTICATION_TYPE, this.applicationService.accessToken);

    return httpHeaders;
  }

  private initParams(params: any): any {

    let params_ = {};

    if (!isNullOrUndefined(params)) {

      Object.keys(params).forEach((key) => {

        let value = params[key];

        if (!isNullOrUndefined(value)) params_[key] = value;
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

    return this.http.post<any>(url, body, {params: this.initParams(params), responseType: 'json', headers: httpHeaders});
  }

  put(url: string, body: any, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.put<any>(url, body, {params: this.initParams(params), responseType: 'json', headers: httpHeaders});
  }

  delete(url: string, params: any): Observable<any> {

    var url = environment.serviceBaseURL + url;

    let httpHeaders = this.buildHttpHeader(new HttpHeaders());

    return this.http.delete<any>(url, {params: this.initParams(params), responseType: 'json', headers: httpHeaders});
  }
}
