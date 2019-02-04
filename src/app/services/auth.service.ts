import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from './cookie.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class AuthService {

    isConnect = false;
    urlFront = 'http://localhost:3000';

    constructor(private httpClient: HttpClient,
                private router: Router,
                private cookieService: CookieService) {
        this.isConnect = (this.cookieService.getCookie('isConnected')  === 'true');
    }
    getConnectedUser(): Observable<boolean> | Promise<boolean> | boolean  {
        const connectSid = this.cookieService.getCookie('connect.sid');
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                    .get(this.urlFront + '/auth/profile', {
                        params: new HttpParams().set('connectSidAngular', connectSid)
                    })
                    .subscribe(
                        (response) => {
                            // if user is not connected, redirect page
                            if (response === null || !(response['googleId']) ) {
                                console.log('you are not connected');
                                this.router.navigate(['/auth', 'signin-google']);
                                resolve(false);
                            } else {
                                // if user is connected
                                console.log('you are connected');
                                resolve(true);
                            }
                        },
                        (error) => {
                            console.log('Erreur ! : ' + error);
                            this.router.navigate(['/auth', 'signin-google']);
                            resolve(false);
                        }
                    )
                ;
            }
        );
    }

    isConnected() {
        return this.isConnect;
    }

    // this is a test function create at the beginning to test the login interface with login and password
    signInUser(email: string, password: string) {
        this.isConnect = false;
        if (email === 'nicolas@test.com' && password === 'nicolas' ) {
            this.isConnect = true;
        }
        return this.isConnect;
    }
}
