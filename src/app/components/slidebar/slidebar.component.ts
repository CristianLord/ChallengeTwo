import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit(): void {
  }

  /**
   * Log out a user.
   */
  logOut():void{
    this.data.loggingOut();
  }

}
