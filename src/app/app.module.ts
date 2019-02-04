import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UndefinedComponent } from './undefined/undefined.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderBlockComponent } from './header-block/header-block.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ConfirmationComponent } from './auth/confirmation/confirmation.component';
import { ErrorComponent } from './auth/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninGoogleComponent } from './auth/signin-google/signin-google.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {CookieService} from './services/cookie.service';
import {ProfileComponent} from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UndefinedComponent,
    HeaderBlockComponent,
    HomeComponent,
    SigninComponent,
    ConfirmationComponent,
    ErrorComponent,
    SigninGoogleComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
      AuthGuardService,
      AuthService,
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
