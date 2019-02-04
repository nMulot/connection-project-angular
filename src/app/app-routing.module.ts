import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './auth/signin/signin.component';
import {ConfirmationComponent} from './auth/confirmation/confirmation.component';
import {ErrorComponent} from './auth/error/error.component';
import {SigninGoogleComponent} from './auth/signin-google/signin-google.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signin-google', component: SigninGoogleComponent },
  { path: 'auth/confirmation', canActivate: [AuthGuardService], component: ConfirmationComponent },
  { path: 'auth/error', component: ErrorComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'error-404', component: NotFoundComponent },
  { path: '**', redirectTo: 'error-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

