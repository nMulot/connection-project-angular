import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-google',
  templateUrl: './signin-google.component.html',
  styleUrls: ['./signin-google.component.scss']
})
export class SigninGoogleComponent implements OnInit {

  urlFront: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.urlFront = this.authService.urlFront;
    const isConnected = this.authService.isConnected();
    if ( isConnected === true ) {
      this.router.navigate(['/profile']);
    }
  }

}
