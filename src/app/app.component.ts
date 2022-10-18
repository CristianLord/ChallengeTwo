import { Component, OnInit } from '@angular/core';
import { DataService } from './api/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'challenge-two-app';
  
  constructor(public data:DataService){}

}
