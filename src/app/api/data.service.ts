import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user?:User;
  userName:string = '';
  authenticated:boolean = false;

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

  loggingOut():void{
    this.cookieService.delete('token_access');
    localStorage.clear();
    this.authenticated = false;
    this.router.navigate(['/login']);
  }
}
