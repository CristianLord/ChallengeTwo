import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JournalsHomeComponent } from './components/journals-home/journals-home.component';
import { LoginComponent } from './components/login/login.component';
import { MySubscriptionsComponent } from './components/my-subscriptions/my-subscriptions.component';
import { RegisterComponent } from './components/register/register.component';
import { SubscriptionFindComponent } from './components/subscription-find/subscription-find.component';
import { UpsertJournalComponent } from './components/upsert-journal/upsert-journal.component';
import { ViewJournalComponent } from './components/view-journal/view-journal.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  { path:"upsert-journal", component: UpsertJournalComponent, canActivate: [AuthGuard] },
  { path: "journals/:id", component: JournalsHomeComponent, canActivate: [AuthGuard]},
  { path: "view-journal/:id", component: ViewJournalComponent, canActivate: [AuthGuard]},
  { path: "find-new", component: SubscriptionFindComponent, canActivate: [AuthGuard]},
  { path: "my-subscriptions", component: MySubscriptionsComponent, canActivate: [AuthGuard]},
  { path:'**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
