import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/api.service';
import { AuthorizationService } from '../../shared/authorization.service';
import {Product} from './product';
import {first} from 'rxjs/operators';


@Injectable()
export class ProductService {
  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {
  }

  public getAllProducts() {
    const uri = 'retrieveAll';
    return this.api.get(uri).pipe(first())
      .subscribe(
        data => {
          console.log('Path is correct');
          console.log(data);
        },
        data => {
          console.log('Path is incorrect');
        }
      );
  }


}
