import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-webshop',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(cookieService: CookieService) {
    AppComponent.cookieService = cookieService;
  }

  public static cookieService: CookieService;
  showHeader = true;
}
