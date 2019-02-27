import { Component, OnInit } from '@angular/core';
import {User} from '../user/user';
import {AuthorizationService} from '../shared/authorization.service';
import {Router} from '@angular/router';
import {error} from '@angular/compiler/src/util';
import {UserService} from '../user/user.service';
import {Product} from '../product/product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddAdminComponent} from './add-admin/add-admin-modal.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;
  editedUser: User;

  constructor(private authService: AuthorizationService,
              private router: Router,
              private userService: UserService,
              private addAdminModal: AddAdminComponent) {

  }

  ngOnInit() {
    if (this.authService.hasAuthorization() === false) {
      this.router.navigate(['/login']);
    }
    this.user = <User>this.authService.getAuthenticator();
  }

  update() {
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    let password;

    if ((<HTMLInputElement>document.getElementById('password')).value ===
      (<HTMLInputElement>document.getElementById('password-repeat')).value) {
      password = (<HTMLInputElement>document.getElementById('password')).value;
    } else {
      error('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }
    this.editedUser = new User(email, name, password, 'GUEST');
    this.userService.update(this.user.email, this.editedUser).subscribe(
      succes => {
        alert('Uw gegevens zijn succesvol gewijzigd.');
        this.userService.login(this.editedUser, false);
        window.location.reload();
      },
      error => {
        alert('Er ging iets mis! Uw gegevens zijn NIET gewijzigd.');
      }
    );
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
    this.addAdminModal.openModal();
  }
}
