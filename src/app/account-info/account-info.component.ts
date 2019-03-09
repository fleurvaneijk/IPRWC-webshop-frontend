import { Component, OnInit } from '@angular/core';
import {User} from '../user/user';
import {AuthorizationService} from '../shared/authorization.service';
import {Router} from '@angular/router';
import {error} from '@angular/compiler/src/util';
import {UserService} from '../user/user.service';
import {AddAdminComponent} from './add-admin/add-admin-modal.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;
  name;
  oldEmail;
  password1: string;
  password2: string;

  constructor(private authService: AuthorizationService,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
    if (this.authService.hasAuthorization() === false) {
      this.router.navigate(['/login']);
    }
    this.user = <User>this.authService.getAuthenticator();
    this.oldEmail = this.user.email;
    this.name = this.user.name;
    this.password1 = this.user.password;
  }

  update() {
    this.checkPassword();
    console.log(this.oldEmail);
    console.log(this.user);
    this.userService.update(this.oldEmail, this.user);
  }

  private checkPassword() {
    if (this.password1 === this.password2) {
      this.user.password = this.password1;
    } else {
      error('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }
  }

  logout() {
    this.userService.logout();
  }

  deleteAccount() {
    if (confirm('Weet u zeker dat u uw account wilt verwijderen?')) {
      this.userService.delete(this.user.email).subscribe(
        succes => {
          alert('Uw account is succesvol verwijdert.');
          this.userService.logout();
        },
        error => {
          alert('Er ging iets mis! Uw account is NIET verwijdert.');
        }
      );
    }
  }

  openModal () {
    AddAdminComponent.openModal();
  }
}
