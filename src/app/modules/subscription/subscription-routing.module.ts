import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { SubscriptionFindComponent } from './pages/subscription-find/subscription-find.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: "find-new", component: SubscriptionFindComponent},
      { path: "my-subscriptions", component: MySubscriptionsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
