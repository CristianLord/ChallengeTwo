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
export class JournalsHomeComponent implements OnInit {

  journals?:Journal[];
  title!:string

  constructor(private readonly api:JournalsService, 
    private readonly route:ActivatedRoute, 
    private data:DataService,
    private router:Router) {
  }

  ngOnInit(): void {
      let idUser = parseInt(this.route.snapshot.paramMap.get("id")!);
      this.title = idUser === this.data.user?.id ? 'Your journals' : 'Their journals' 
      this.api.apiJournalsUserJournalsIdGet$Json({id:idUser}).subscribe(res =>
      this.journals = res);
  }

  /**
   * Delete a journal.
   */
  deleteJournal(id:number):void{
    this.api.apiJournalsIdDelete({id}).subscribe(res => {  
      this.ngOnInit();
    })
    
  }

}
