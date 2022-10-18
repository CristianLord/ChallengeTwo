import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  { 
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'journal',
    loadChildren: () => import('./modules/journal/journal.module').then(m => m.JournalModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'subscription',
    loadChildren: () => import('./modules/subscription/subscription.module').then(m => m.SubscriptionModule),
    canActivate: [AuthGuard]
  },
  { path:'**', pathMatch:'full', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
