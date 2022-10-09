import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { UsersService } from 'src/app/api/services';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
/**
 * This component shows the Topbar of the application.
 */
export class TopbarComponent implements OnInit {

  /**
   * Topbar component contructor.
   * @param data Current data user.
   */
  constructor(public data:DataService) {
  }

  ngOnInit(): void {
  }

  /**
   * Log out the current user.
   */
  logOut():void{
    this.data.loggingOut();
  }

}
