import {Injectable} from '@angular/core';
import {
  HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpParams, HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpService implements HttpInterceptor {

  private http: any;
  private handleError: any;

  constructor(private Http: HttpClient) {
    this.http = Http;
  }

  // get方法
  // tslint:disable-next-line:ban-types
  public get(url: string, options?: Object, params?: Object): Observable<{}> {
    return this.http.get(url, options).pipe(catchError(this.handleError));
  }

  // post方法
  // tslint:disable-next-line:ban-types
  public post(url: string, body: any = null, options?: Object): Observable<{}> {
    return this.http.post(url, body, options).pipe(catchError(this.handleError));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
