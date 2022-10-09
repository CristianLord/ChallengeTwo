import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalsService } from 'src/app/api/services';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.scss']
})

/**
 * This component shows the journal in the aplication.
 */
export class ViewJournalComponent implements OnInit {

  /**
   * This property is the title of the jounal.  
   **/
   title!: string;
  /**
   * This property is the URL of the jounal.  
   **/
  pdfSrc!: string;

  /**
   * View journal component contructor.
   * @param api Journal api service
   * @param route Provides the journal ID
   * @param http Verify if the URL of the PDF is valid.
   */
  constructor(
    private readonly api: JournalsService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //Get the journal ID from the route parameter.
    let idJournal = parseInt(this.route.snapshot.paramMap.get("id")!);
    //Looking for the journal's path from database.
    this.api.apiJournalsJournalIdGet$Json({ id: idJournal! }).subscribe(
      {
        next: (res) => {
          this.http.get(res.pathFile!, { responseType: 'text' }).subscribe(
            {
              next: () => { 
                this.title = res.title!,
                this.pdfSrc = res.pathFile! 
              },
              error: (error) => { }
            });
        },
        error: (error) => { }
      });
  }

}
