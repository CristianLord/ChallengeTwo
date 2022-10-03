import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { User } from 'src/app/api/models';
import { Journal } from 'src/app/api/models/journal';
import { JournalsService } from 'src/app/api/services/journals.service';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user!:User;
  journals!:Journal[];

  constructor(private api:JournalsService, private data:DataService) { 
    api.apiJournalsSubscriptionsJournalsIdGet$Json({id:data.user?.id!}).subscribe(res => this.journals = res);
  }

  ngOnInit(): void {
  }

}
