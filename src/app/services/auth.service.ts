import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from './cookie.service';
import {Observable, Subject} from 'rxjs';
import {sha512} from 'js-sha512';

@Injectable()
export class AuthService {

    isConnect = false;
    urlBack = 'http://localhost:3000';
    private firstKey = 'F398FS83';
    private secondKey = 'JF3F9509';

    constructor(private httpClient: HttpClient,
                private router: Router,
                private cookieService: CookieService) {
        this.isConnect = (this.cookieService.getCookie('isConnected')  === 'true');
    }

    isConnected() {
        return this.isConnect;
    }

    // get connected user and redirect the user if is not connected
    getConnectedUser(): Observable<boolean> | Promise<boolean> | boolean  {
        const connectSid = this.cookieService.getCookie('connect.sid');
        const isConnect = (this.cookieService.getCookie('isConnected')  === 'true');
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                    .get(this.urlBack + '/auth/profile', {
                        params: new HttpParams().set('connectSidAngular', connectSid)
                    })
                    .subscribe(
                        (response) => {
                            // if user is not connected, redirect page
                            if (response === null) {
                                console.log('you are not connected');
                                this.logout();
                                resolve(false);
                            } else { // if user is connected in serveur
                                // check if cookie local is ok
                                if ( isConnect === true ) {
                                    console.log('you are connected');
                                    resolve(true);
                                } else {
                                    console.log('you are not connected');
                                    resolve(false);
                                }
                            }
                        },
                        (error) => {
                            console.log('Erreur ! : ' + error);
                            this.logout();
                            resolve(false);
                        }
                    )
                ;
            }
        );
    }



    // this is a test function create at the beginning to test the login interface with login and password
    signInUser(email: string, password: string) {

        password = this.encryptPassword(password);
        const connectSid = this.cookieService.getCookie('connect.sid');
        this.httpClient
            .post(this.urlBack + '/auth/login', {
                email: email,
                password: password,
                sid: connectSid
            })
            .subscribe(
                (response) => {
                    // if the user has not logged in
                    if ( response['error'] === true) {
                        this.router.navigate(['/auth', 'error']);
                    } else {
                        this.redirectionToConnect();
                    }
                },
                (error) => {
                    console.log('Erreur ! : ', error);
                    this.router.navigate(['/auth', 'error']);
                }
            )
        ;
    }

    redirectionToConnect() {
        window.location.href = this.urlBack + '/auth/signin/redirect';
    }

    logout() {
        window.location.href = this.urlBack + '/auth/logout';
    }

    encryptPassword(password) {
        password = sha512(this.firstKey + password);
        password = sha512(password + this.secondKey);
        return password;
    }
}
