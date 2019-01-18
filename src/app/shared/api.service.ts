import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class ApiService {

  private endpoint = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthorizationService) {

  }

  private createQueryString(queryParameters: Object): string {
    let queryString = '';

    if (typeof queryParameters === 'object') {
      for (const key in queryParameters) {
        const value = queryParameters[key];
        const prefix = queryString.length === 0 ? '?' : '&';

        queryString += `${prefix}${key}=${value}`;
      }
    }

    return queryString;
  }

  private createURI(path: string, queryParameters: Object): string {
    const queryString = this.createQueryString(queryParameters);

    return `/api/${path}${queryString}`;
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString());
    }

    return headers;
  }

  public get<Object>(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.get<Object>(uri, { headers: headers });
  }

  public post<T>(path: string, data: Object, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.post(uri, data, { headers: headers });
  }

  public put<T>(path: string, data: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.put(uri, data, { headers: headers });
  }

  public delete<T>(path: string, queryParameters?: Object): Observable<any> {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return this.http.delete(uri, { headers: headers });
  }
}
