import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { HomeComponent } from './components/home/home.component';
import { JournalsHomeComponent } from './components/journals-home/journals-home.component';
import { SubscriptionFindComponent } from './components/subscription-find/subscription-find.component';
import { MySubscriptionsComponent } from './components/my-subscriptions/my-subscriptions.component';
import { UpsertJournalComponent } from './components/upsert-journal/upsert-journal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewJournalComponent } from './components/view-journal/view-journal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SubscriptionCardComponent } from './components/subscription-card/subscription-card.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    TopbarComponent,
    FooterComponent,
    HomeCardComponent,
    HomeComponent,
    JournalsHomeComponent,
    SubscriptionFindComponent,
    MySubscriptionsComponent,
    UpsertJournalComponent,
    ViewJournalComponent,
    SubscriptionCardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
