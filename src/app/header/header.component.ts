import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthorizationService } from '../shared/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public authenticated = false;
  public loggedIn = false;

  constructor(private authService: AuthorizationService, private router: Router) {
    this.authenticated = authService.hasAuthorization();

    authService.authorized$.subscribe(
      authorized => {
        this.authenticated = authorized;
      }
    );
  }

}
