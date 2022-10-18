import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
/**
 * This service manages current user's data.
 */
export class DataService {

  user?:User;
  userName:string = '';
  authenticated:boolean = false;

  /**
   * Data service contructor.
   * @param cookieService Application's cookies.
   * @param router Redirect a new page.
   */
  constructor(private cookieService:CookieService, private router:Router){
    
    if(cookieService.check('token_access'))
    {
      this.authenticated = true;
      if(localStorage.getItem("user") !== null ||  typeof this.user !== 'undefined')
      {
        this.user = JSON.parse(localStorage.getItem("user")!);
        this.userName = this.user?.firstName!;
      }
    }

  }

  /**
   * Log out the current user.
   */
  loggingOut():void{
    this.cookieService.delete('token_access');
    localStorage.clear();
    this.authenticated = false;
    this.router.navigate(['/auth','login']);
  }
}