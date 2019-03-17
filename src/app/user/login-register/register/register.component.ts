import { Component } from '@angular/core';

import { UserService } from '../../user.service';
import { User } from '../../user';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
              '../../../../../src/modal-styles.css'],
})
export class RegisterComponent {
  user: User;
  name1;
  email1 = '';
  password1 = '';
  password2 = '';

  constructor(private userService: UserService) {

  }

  register() {
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    let password;

    if ((<HTMLInputElement>document.getElementById('password')).value ===
        (<HTMLInputElement>document.getElementById('password-repeat')).value) {
      password = (<HTMLInputElement>document.getElementById('password')).value;
    } else {
      error('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }

    this.checkPassword(password);

    this.user = new User(email, name, password, 'GUEST');
    this.userService.addUser(this.user);
  }

  checkPassword(password: string) {

  }
}
