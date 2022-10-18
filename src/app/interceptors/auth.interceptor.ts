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
import { Router } from '@angular/router';

/**
 * This class manages all http requests from the application.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService,
    private router: Router) { }

  /**
   * Intercept all http request.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //Get token from the cookie
    const token: string = this.cookieService.get('token_access');
    let req = request;

    //If the cookie exists, we put it in header authorization.
    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + token
        }
      })
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 0) {
          console.log("Server not found...")
        }
        if (error.status == 404) {
          this.router.navigate(['404'])
        }
        return throwError(() => error);
      })
    );
  }
}
