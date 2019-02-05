import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;
  email: FormControl;
  password: FormControl;
  signInForm: FormGroup;
  urlBack: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  // init urlBack and forms. And redirect if user is connected
  ngOnInit() {
    this.urlBack = this.authService.urlBack;
    const isConnected = this.authService.isConnected();
    if ( isConnected === true ) {
      this.router.navigate(['/profile']);
    }
    this.initForm();
  }

  // init forms and validators
  initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required/*, Validators.pattern(/[0-9a-zA-Z]{6,}/)*/]);
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  // recover the submitted data and try to connect the user
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password);
  }

  // manage error message
  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
        this.email.hasError('email') ? 'Email non valide' : '';
  }
}
