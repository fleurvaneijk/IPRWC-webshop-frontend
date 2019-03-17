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
    const uri = 'users';
    return this.api.get<User[]>(uri);
  }

  public getUser(email: string) {
    const uri = 'users/' + email;
    return this.api.get<User>(uri);
  }

  public addUser(user: User): void {
    this.getUser(user.email).subscribe
    (data => {
      if (data == null) {
        const uri = 'users';
        this.api.post<void>(uri, user)
          .subscribe(
            succes => {
              alert('Het registreren is gelukt! U kan nu inloggen.');
              window.location.reload();
            },
            error => {
              alert('Het registreren is mislukt.');
            }
          );
      } else {
        alert('De ingevoerde e-mail is al in gebruik.');
      }
    });
  }

  public addAdmin(admin: User): void {
    console.log(admin);

    this.getUser(admin.email).subscribe
    (data => {
      if (data == null) {
        const uri = 'users/createAdmin';
        this.api.post<void>(uri, admin).subscribe(
            succes => {
              alert('Het registreren is gelukt! U kan nu inloggen.');
              window.location.reload();
            },
            error => {
              alert('Het registreren is mislukt.');
            }
          );
      } else {
        alert('De ingevoerde e-mail is al in gebruik.');
      }
    });
  }

  update(email: string, user: User) {
    const uri = 'users/' + email;
    this.api.post(uri, user).subscribe (
      succes => {
        alert('Uw gegevens zijn succesvol gewijzigd.');
        this.login(user, false);
        window.location.reload();
      },
      error => {
        alert('Er ging iets mis! Uw gegevens zijn NIET gewijzigd.');
      }
    );
  }

  delete(email: string): Observable<any> {
    const uri = 'users/' + email;
    return this.api.delete(uri);
  }

  public login(user: User, remember: boolean): void {
    this.authService.setAuthorization(user.email, user.password);

    this.api.get<User>('users/me').subscribe (
      authenticator => {
        this.authService.storeAuthorization(authenticator, remember);
        this.goToAccountPage(authenticator);
      },
      error => {
        alert('Het inloggen is mislukt.');
      }
    );
  }

  public logout() {
    this.authService.deleteAuthorization();
    this.router.navigate(['/login']);
  }

  public goToAccountPage(user) {
    if (user.role === 'ADMIN' || user.role === 'GUEST') {
      this.router.navigate(['/account']);
    } else {
      this.goHome();
    }
  }

  private goHome() {
    this.router.navigate(['']);
  }
}
