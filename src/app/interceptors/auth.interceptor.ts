import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}

  /**
   * Intercept all http request
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = this.cookieService.get('token_access');
    let req = request;
    if(token){
      req = request.clone({
        setHeaders:{
          Authorization: 'bearer ' + token
        }
      })
    }
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
      );
  }
}
