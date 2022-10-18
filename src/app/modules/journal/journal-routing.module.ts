import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalsHomeComponent } from './pages/journals-home/journals-home.component';
import { UpsertJournalComponent } from './pages/upsert-journal/upsert-journal.component';
import { ViewJournalComponent } from './pages/view-journal/view-journal.component';


const routes: Routes = [
  {
    path:'',
    children:[
      { path: "journals/:id", component: JournalsHomeComponent },
      { path: "upsert-journal", component: UpsertJournalComponent },
      { path: "upsert-journal/:id", component: UpsertJournalComponent },
      { path: "view-journal/:id", component: ViewJournalComponent },
      { path: '**', redirectTo:'error404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
