import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { HomeCardComponent } from './components/home-card/home-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
