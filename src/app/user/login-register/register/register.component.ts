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
  name1 = '';
  email1 = '';
  password1 = '';
  password2 = '';

  constructor(private userService: UserService) {

  }

  register() {
    if (this.checkPassword(this.password1)) {
      this.user = new User(this.email1, this.name1, this.password1, 'GUEST');
      this.userService.addUser(this.user);
    }
  }

  checkPassword(password: string) {
    if (this.password1 === this.password2) {
      return true;
    } else {
      alert('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }
  }
}
