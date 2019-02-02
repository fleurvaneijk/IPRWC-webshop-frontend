import { Component } from '@angular/core';

import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User;

  constructor(private userService: UserService) {

  }

  login() {
    this.userService.login(this.user, false);
  }
}
