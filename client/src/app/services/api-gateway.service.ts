import { Injectable } from '@angular/core';
import {
  Http, Headers,
  RequestOptionsArgs
} from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  constructor(private http: Http) {

  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // Usage!
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  get(url, params?, parameters?): Observable<any> {
    let requestParameters: RequestOptionsArgs = {};

    let headers = new Headers();
    if (!!params) {
      requestParameters.search = this.buildUrlSearchParams(params);
    }


    if (parameters) {
      parameters.forEach(param => {
        requestParameters[param.key] = param.value
      });
    }
    requestParameters.headers = headers;

    // this.createAuthorizationHeader(headers);

    return this.http.get(url, requestParameters).pipe(
      (map(this.unwrapHttpValue))).pipe(
        catchError((error: any) => {
          let unwrapError = this.unwrapHttpError(error);
          return unwrapError;
        })
      );

  }
  public post(url, data) {
    let headers = new Headers();

    return this.http.post(url, data, {
      headers: headers
    })
      .pipe(map(this.unwrapHttpValue)).pipe(
        catchError((error: any) => {
          let unwrapError = this.unwrapHttpError(error);
          return unwrapError;
        }));


  }

  put(url, data) {
    let headers = new Headers();

    return this.http.put(url, data, {
      headers: headers
    }).pipe(map(this.unwrapHttpValue)).pipe(
      catchError((error: any) => {
        let unwrapError = this.unwrapHttpError(error);
        return unwrapError;
      }));

  }


  private buildUrlSearchParams(params: any): URLSearchParams {
    var searchParams = new URLSearchParams();
    for (var key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((data) => {
          searchParams.append(key, data)
        });
      } else {
        if (this.isJsObject(params[key])) {
          searchParams.append(key, JSON.stringify(params[key]));
        } else {
          searchParams.append(key, params[key]);
        }
      }
    }
    return searchParams;
  }
  private isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
  }
  private isJson(str) {
    try {
      let obj = JSON.parse(str);
      return { isJSON: true, object: obj };
    }
    catch (e) {
      return { isJSON: false, object: {} }
    }

  }
  private unwrapHttpError(error: any): any {
    try {
      // this.notifyPopupService.emitServerErrorEvent(error);

      return (error.json());

    } catch (jsonError) {

      return ({
        code: -1,
        message: "An unexpected error occurred."
      });
    }
  }
  private unwrapHttpValue(value: any): any {
    if (value) {
      try {
        let obj = JSON.parse(value['_body']);
        return obj;
      }
      catch (e) {
        return value;
      }

    }
    return "";
    // return !!value.text() ? value.json() : "";
  }
 
}
