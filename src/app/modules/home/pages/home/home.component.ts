import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { Journal } from 'src/app/api/models/journal';
import { JournalsService } from 'src/app/api/services/journals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * This component shows the home page where are all journals of the user's subscriptions
 */
export class HomeComponent implements OnInit {

  /**
   * List of journals.
   */
  journals!: Journal[];

  /**
   * Home component contructor.
   * @param api Journal API service.
   * @param data Current user data service.
   */
  constructor(private api: JournalsService, private data: DataService) {
    api.apiJournalsSubscriptionsJournalsIdGet$Json({ id: data.user?.id! }).subscribe(
      {
        next: (res) => { this.journals = res },
        error: (error) => { }
      });
  }

  ngOnInit(): void {
  }

}
