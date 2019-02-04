import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService,
                private httpClient: HttpClient) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.getConnectedUser();
    }
}
