import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './api/data.service';
import { User } from './api/models';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'challenge-two-app';
  
  constructor(public data:DataService){
    
  }

}
