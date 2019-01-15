import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();

  constructor(private userService: UserService) {

  }

  register() {
    this.userService.register(this.user);
  }
}
