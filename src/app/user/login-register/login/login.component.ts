import { Component } from '@angular/core';

import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();

  constructor(private userService: UserService) {

  }

  login() {
    const email = (<HTMLInputElement>document.getElementById('login-email')).value;
    const password = (<HTMLInputElement>document.getElementById('login-password')).value;
    this.user.setEmail(email);
    this.user.setPassword(password);
    this.userService.login(this.user, false);
  }
}
