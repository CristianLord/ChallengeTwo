import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';

import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { SubscriptionFindComponent } from './pages/subscription-find/subscription-find.component';
import { SubscriptionCardComponent } from './components/subscription-card/subscription-card.component';

@NgModule({
  declarations: [
    MySubscriptionsComponent,
    SubscriptionFindComponent,
    SubscriptionCardComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }