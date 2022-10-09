import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
/**
 * This component shows the Slidebar of the application.
 */
export class SlidebarComponent implements OnInit {

  /**
   * Slidebar component constructor.
   * @param data Current data user.
   */
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }

  /**
   * Log out the current user.
   */
  logOut():void{
    this.data.loggingOut();
  }

}
