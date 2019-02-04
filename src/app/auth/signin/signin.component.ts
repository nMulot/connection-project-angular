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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required/*, Validators.pattern(/[0-9a-zA-Z]{6,}/)*/]);
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    console.log(email, password);

    if ( this.authService.signInUser(email, password) === true ) {
      this.router.navigate(['/auth', 'confirmation']);
    } else {
      this.router.navigate(['/auth', 'error']);
    }
    // this.authService.signInUser(email, password).then(
    //     () => {
    //       this.router.navigate(['/books']);
    //     },
    //     (error) => {
    //       this.errorMessage = error;
    //     }
    // );
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
        this.email.hasError('email') ? 'Email non valide' :
            '';
  }
}
