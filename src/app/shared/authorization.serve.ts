import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class Authorization {
  public ding$ = new Subject<boolean>();
  logedIn = false;

  isLoggedIn() {
    this.logedIn = true;
  }

  getLoggedin() {
    return this.logedIn;
  }
}
