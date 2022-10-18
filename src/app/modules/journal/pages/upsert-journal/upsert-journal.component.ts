import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { Journal } from 'src/app/api/models';
import { JournalsService } from 'src/app/api/services';

@Component({
  selector: 'app-upsert-journal',
  templateUrl: './upsert-journal.component.html',
  styleUrls: ['./upsert-journal.component.scss']
})
/**
 * This component manages the upload of journals. 
 */
export class UpsertJournalComponent implements OnInit {

  /**
   * Form group of the journal's form.
   */
  formJournal!: FormGroup;

  /**
   * ID of the journal.
   */
  idJournal:number = 0;

  /**
   * Journal model.
   */
  journal!: Journal

  /**
   * Journal file.
   */
  journalFile!: File;

  /**
   * Upsert compoent contructor.
   * @param formBuilder Build the form.
   * @param api Journal API service.
   * @param data Current data user.
   * @param route Provides the journal ID
   * @param router Redirect a new page.
   */
  constructor(private formBuilder: FormBuilder,
    private readonly api: JournalsService,
    private data: DataService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.formJournal = this.formBuilder.group({
      title: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });

    if(this.route.snapshot.paramMap.get("id")! != null)
    {
      this.formJournal = this.formBuilder.group({
        title: ['', [Validators.required]],
        file: ['', []]
      });
      this.idJournal = parseInt(this.route.snapshot.paramMap.get("id")!);
      this.api.apiJournalsJournalIdGet$Json({id:this.idJournal}).subscribe(
        {
          next: response => { 
              this.formJournal.patchValue({
              title: response.title,
            });
          },
          error: (error) => { console.log(error) }
        }
      );
    }
  }

  /**
   * Obtain the file uploaded
   */
  getFile($event: any): void {
    this.journalFile = $event.target.files[0];
  }

  /**
   * Send a new journal to api
   */
  sendJournal(): void {

    if(this.idJournal === 0)
    {
      //Create new journal.
      this.api.apiJournalsPost$Json$Response({
        body: {
          Title: this.formJournal.value.title,
          File: this.journalFile,
          IdUser: this.data.user?.id,
        }
      }).subscribe({
        next: res => {
          this.router.navigate(['journal','journals', this.data.user?.id]);
        }
      });
    }
    else
    {
      //Update journal
      this.api.apiJournalsIdPut({
        id:this.idJournal, 
        body: {
          Title: this.formJournal.value.title,
          File: this.journalFile,
          IdUser: this.data.user?.id
        }
      }).subscribe({
        next: () => { this.router.navigate(['journal','journals', this.data.user?.id]); },
        error: (error) => {}
      });
        
    }

  }
}
