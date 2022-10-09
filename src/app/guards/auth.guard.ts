import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * This class manages pages for logged in users
 */
export class AuthGuard implements CanActivate {
  
  /**
   * Authentication guard contructor.
   * @param cookieService Application's cookies
   * @param router Redirect a new page.
   */
  constructor(private cookieService:CookieService, private router:Router){

  }
  
  /**
   * Redirect the user.
   * @param flag Indicates if the user is redirected or not
   */
  redirect(flag:boolean): any{
    if(!flag){
      this.router.navigate(['/','login'])
    }
  }

  /**
   * Allows access to the application if the user is already logged in.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookie = this.cookieService.check('token_access');
      this.redirect(cookie);
      return cookie;
  }
  
}
