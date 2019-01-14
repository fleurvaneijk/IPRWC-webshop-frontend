// import {OnInit} from '@angular/core';
// import {HttpHeaders} from '@angular/common/http';
// import {AppComponent} from '../app.component';
//
// export class AuthorisationService implements OnInit {
//
//   public static header: HttpHeaders = new HttpHeaders();
//   public static email: string;
//   public static isLoggedIn = false;
//   public static role: string;
//   ngOnInit() {
//
//   }
//
//   public setHeader(emailAddress: string, password: string) {
//
//     const authString = 'Basic ' + btoa(emailAddress + ':' + password);
//     AuthorisationService.header = AuthorisationService.header.set('Authorization', authString);
//
//   }
//
//   public retrieveCookie() {
//     AuthorisationService.header = AuthorisationService.header.set('Authorization', AppComponent.cookieService.get('header'));
//     AuthorisationService.email = String(AppComponent.cookieService.get('email'));
//     AuthorisationService.role = String(AppComponent.cookieService.get(('role')));
//   }
//
//   public saveCookie() {
//     AppComponent.cookieService.set('header', AuthorisationService.header.get('Authorization'));
//     AppComponent.cookieService.set('email', String(AuthorisationService.email));
//     AppComponent.cookieService.set('role', String(AuthorisationService.role));
//   }
//   public logout() {
//     AppComponent.cookieService.deleteAll();
//     AuthorisationService.header = new HttpHeaders();
//     AuthorisationService.email = null;
//     AuthorisationService.isLoggedIn = false;
//     AuthorisationService.role = null;
//   }
// }

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {
    private login: string = null;
    private password: string = null;
    private authenticator: Object = null;

    public authorized$ = new Subject<boolean>();

    constructor() {
        this.restoreAuthorization();
    }

    public hasAuthorization(): boolean {
        return this.login !== null && this.password !== null;
    }

    public setAuthorization(login: string, password: string): void {
        this.login = login;
        this.password = password;
    }

    public storeAuthorization(authenticator: Object, local: boolean) {
        this.authenticator = authenticator;

        const authorization = {
            login: this.login,
            password: this.password,
            authenticator: this.authenticator
        };

        const authorizationString = JSON.stringify(authorization);
        const storage = local ? localStorage : sessionStorage;

        storage.setItem('authorization', authorizationString);

        this.authorized$.next(true);
    }

    private restoreAuthorization(): void {
        let authorizationString = sessionStorage.getItem('authorization');

        if (authorizationString === null) {
            authorizationString = localStorage.getItem('authorization');
        }

        if (authorizationString !== null) {
            const authorization = JSON.parse(authorizationString);

            this.login = authorization['login'];
            this.password = authorization['password'];
            this.authenticator = authorization['authenticator'];

            this.authorized$.next(true);
        }
    }

    public deleteAuthorization(): void {
        this.login = null;
        this.password = null;
        this.authenticator = null;

        sessionStorage.removeItem('authorization');
        localStorage.removeItem('authorization');

        this.authorized$.next(false);
    }

    public createAuthorizationString(): string {
        return 'Basic ' + btoa(this.login + ':' + this.password);
    }

    public getAuthenticator(): Object {
        return this.authenticator;
    }

    public setAuthenticator(authenticator: Object): void {
        this.authenticator = authenticator;
    }
}
