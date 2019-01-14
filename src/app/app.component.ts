import { Component } from '@angular/core';
import { Authorization } from './shared/authorization.serve';
import {CookieService} from 'ngx-cookie-service';
import { AuthorizationService } from './shared/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static cookieService: CookieService;
  constructor(cookieService: CookieService, private auth: AuthorizationService) {
    AppComponent.cookieService = cookieService;

  }
  public getisLoggedIn(): boolean {
    return AuthorizationService.isLoggedIn;
  }
}
