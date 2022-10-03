import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JournalsService } from 'src/app/api/services';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.scss']
})
export class ViewJournalComponent implements OnInit {

  //@Input() 
  pdfSrc!:string;

  constructor(private readonly api:JournalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idJournal = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.api.apiJournalsJournalIdGet$Json({id: idJournal!}).subscribe(res => {
      this.pdfSrc = res.pathFile!
    });
  }

}
