import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { JournalsHomeComponent } from './pages/journals-home/journals-home.component'
import { UpsertJournalComponent } from './pages/upsert-journal/upsert-journal.component'
import { ViewJournalComponent } from './pages/view-journal/view-journal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JournalsHomeComponent,
    UpsertJournalComponent,
    ViewJournalComponent
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule
  ]
})
export class JournalModule { }
