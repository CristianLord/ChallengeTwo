import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { Journal } from 'src/app/api/models';
import { JournalsService } from 'src/app/api/services';

@Component({
  selector: 'app-journals-home',
  templateUrl: './journals-home.component.html',
  styleUrls: ['./journals-home.component.scss']
})

/**
 * This component shows all user's journals.
 */
export class JournalsHomeComponent implements OnInit {

  /**
   * List of User's journals.
   */
  journals?:Journal[];

  /**
   * Title of the component.
   */
  title!:string

  authorized:boolean = false;

  /**
   * Journals home component constructor.
   * @param api Journal API service.
   * @param route Provides the User's ID.
   * @param data Current user data service.
   */
  constructor(private readonly api:JournalsService, 
    private readonly route:ActivatedRoute, 
    private data:DataService) {
  }

  ngOnInit(): void {
      let idUser = parseInt(this.route.snapshot.paramMap.get("id")!);
      this.title = idUser === this.data.user?.id ? 'Your journals' : 'Their journals'
      this.authorized = idUser === this.data.user?.id
      this.api.apiJournalsUserJournalsIdGet$Json({id:idUser}).subscribe({ 
        next: (res) => this.journals = res,
        error: (error) => {}
      });
  }

  /**
   * Delete a journal from database.
   * @param id Journal ID to delete.
   */
  deleteJournal(id:number):void{
    if(confirm('Are you sure you want to delete it?')){
      this.api.apiJournalsIdDelete({id}).subscribe({
        complete:() => this.ngOnInit()
      });
    }
  }

}
