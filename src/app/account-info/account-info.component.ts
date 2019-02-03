import { Component, OnInit } from '@angular/core';
import {User} from '../user/user';
import {AuthorizationService} from '../shared/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user: User;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    if (this.authService.hasAuthorization() === false) {
      this.router.navigate(['/login']);
    }
    this.user = <User>this.authService.getAuthenticator();
  }

  logout() {
    this.authService.deleteAuthorization();
    this.router.navigate(['/login']);
  }

}
