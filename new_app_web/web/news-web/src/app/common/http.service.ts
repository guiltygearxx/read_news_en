// import {Injectable} from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {isNullOrUndefined} from 'util';
// import {environment} from '../../environments/environment';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'
//
// @Injectable()
// export class HttpService {
//
//   loadingHandleFn: (loadingFlag: number) => void;
//
//   constructor(protected http: HttpClient,
//               protected applicationService: ApplicationService) {
//   }
//
//   loadingFlag: number = 0;
//
//   private buildHttpHeader(httpHeaders: HttpHeaders): HttpHeaders {
//
//     let accessToken = this.applicationService.accessToken;
//
//     if (!isNullOrUndefined(accessToken))
//       httpHeaders = httpHeaders.set(AUTHENTICATION_TYPE, this.applicationService.accessToken);
//
//     return httpHeaders;
//   }
//
//   private initParams(params: any): any {
//
//     let params_ = {};
//
//     if (!isNullOrUndefined(params)) {
//
//       Object.keys(params).forEach((key) => {
//
//         let value = params[key];
//
//         if (!isNullOrUndefined(value)) params_[key] = value;
//       });
//     }
//
//     return params_;
//   }
//
//   private handleResponse(response: any): any {
//
//     this.loadingFlag--;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     return response;
//   }
//
//   private handleError(error: any): any {
//
//     this.loadingFlag--;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     console.log(error);
//   }
//
//   get(url: string, params: any): Observable<any> {
//
//     this.loadingFlag++;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     var url = environment.serviceBaseURL + url;
//
//     let httpHeaders = this.buildHttpHeader(new HttpHeaders());
//
//     return this.http
//       .get<any>(url, {params: this.initParams(params), responseType: 'json', headers: httpHeaders})
//       .map((response) => this.handleResponse(response))
//       .catch((error) => this.handleError(error));
//   }
//
//   post(url: string, body: any, params: any): Observable<any> {
//
//     this.loadingFlag++;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     var url = environment.serviceBaseURL + url;
//
//     let httpHeaders = this.buildHttpHeader(new HttpHeaders());
//
//     return this.http.post<any>(url, body, {
//       params: this.initParams(params),
//       responseType: 'json',
//       headers: httpHeaders
//     })
//       .map((response) => this.handleResponse(response))
//       .catch((error) => this.handleError(error));
//   }
//
//   put(url: string, body: any, params: any): Observable<any> {
//
//     this.loadingFlag++;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     var url = environment.serviceBaseURL + url;
//
//     let httpHeaders = this.buildHttpHeader(new HttpHeaders());
//
//     return this.http.put<any>(url, body, {params: this.initParams(params), responseType: 'json', headers: httpHeaders})
//       .map((response) => this.handleResponse(response))
//       .catch((error) => this.handleError(error));
//   }
//
//   delete(url: string, params: any): Observable<any> {
//
//     this.loadingFlag++;
//
//     if (!isNullOrUndefined(this.loadingHandleFn)) this.loadingHandleFn(this.loadingFlag);
//
//     var url = environment.serviceBaseURL + url;
//
//     let httpHeaders = this.buildHttpHeader(new HttpHeaders());
//
//     return this.http.delete<any>(url, {params: this.initParams(params), responseType: 'json', headers: httpHeaders})
//       .map((response) => this.handleResponse(response))
//       .catch((error) => this.handleError(error));
//   }
// }
