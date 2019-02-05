import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {CookieService} from '../services/cookie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';
  thumbnail = '';
  googleId = '';

  constructor(private authService: AuthService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.username = decodeURI(this.cookieService.getCookie('user_username'));
    this.email = decodeURIComponent(this.cookieService.getCookie('user_email'));
    this.thumbnail = decodeURIComponent(this.cookieService.getCookie('user_thumbnail'));
    this.googleId = decodeURI(this.cookieService.getCookie('user_google_id'));
  }

}
