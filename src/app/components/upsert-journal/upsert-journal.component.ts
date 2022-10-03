import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { Journal } from 'src/app/api/models';
import { JournalsService } from 'src/app/api/services';

@Component({
  selector: 'app-upsert-journal',
  templateUrl: './upsert-journal.component.html',
  styleUrls: ['./upsert-journal.component.scss']
})
export class UpsertJournalComponent implements OnInit {

  formJournal!: FormGroup;
  journal!:Journal
  journalFile!:File;

  constructor(private formBuilder: FormBuilder, 
    private readonly api:JournalsService,
    private data:DataService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.formJournal = this.formBuilder.group({
      title: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
  }

  /**
   * Obtain the file uploaded
   */
  getFile($event:any):void{
      this.journalFile = $event.target.files[0];
  }

  /**
   * Send a new journal to api
   */
  sendJournal():void{
    
    this.api.apiJournalsPost$Json$Response({body:{
          Title: this.formJournal.value.title,
          File: this.journalFile,
          IdUser: this.data.user?.id,
        }}).subscribe(res => 
          {
            this.router.navigate(['/journals/'+ this.data.user?.id]);
          });
        
  }
}
