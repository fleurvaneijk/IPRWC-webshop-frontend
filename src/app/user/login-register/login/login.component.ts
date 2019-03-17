import { Component } from '@angular/core';

import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../../../../src/modal-styles.css'],
})
export class LoginComponent {
  user: User = new User();
  email = '';
  password = '';

  constructor(private userService: UserService) {
  }

  login() {
    this.user.setEmail(this.email);
    this.user.setPassword(this.password);
    this.userService.login(this.user, false);
  }
}
