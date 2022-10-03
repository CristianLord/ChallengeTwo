import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { UsersService } from 'src/app/api/services';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(public data:DataService) {
  }

  ngOnInit(): void {
  }

  logOut():void{
    this.data.loggingOut();
  }

}
