import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {

  }

  public getAll(): Observable<User[]> {
    return this.api.get<User[]>('users');
  }

  public getUser(email: string) {
    const uri = 'users/' + email;
    return this.api.get(uri, email);
  }

  public register(user: User): void {
    const uri = 'users';
    this.api.post<void>(uri, user)
      .subscribe(
      data => {
        alert('Het registreren is gelukt! U kan nu inloggen');
      },
      error => {
        alert('Het registreren is mislukt');
      }
    );
  }

  public login(user: User, remember: boolean): void {
    this.authService.setAuthorization(user.email, user.password);

    this.api.get<User>('users/me').subscribe
    (
      authenticator => {
        this.authService.storeAuthorization(authenticator, remember);

        this.getUser(user.email).subscribe(
          data => {
            console.log(data);
            user = <User><unknown>data;
            console.log(user);
            this.goToAccountPage(user);
          }
        );
      },
      error => {
        alert('Het inloggen is mislukt');
      }
    );
  }

  public logout() {
    this.authService.deleteAuthorization();

    this.goHome();
  }

  public goToAccountPage(user) {
    console.log(user.role);
    if (user.role === 'ADMIN' || user.role === 'GUEST') {
      console.log('to account!');
      this.router.navigate(['/account']);
    } else {
      console.log('went home :(');
      this.goHome();
    }
  }

  private goHome() {
    this.router.navigate(['']);
  }
}
