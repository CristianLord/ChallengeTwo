import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
declare var $:any

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
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function() {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });
  }

  /**
   * Log out the current user.
   */
  logOut():void{
    this.data.loggingOut();
  }

}
