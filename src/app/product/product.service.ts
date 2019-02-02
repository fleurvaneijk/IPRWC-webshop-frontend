import { Injectable } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import {Product} from './product';
import {first, map} from 'rxjs/operators';
import 'rxjs-compat/add/operator/map';
import {User} from '../user/user';

@Injectable()
export class ProductService {

  products: Product[] = [];

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {
  }

  public getAllProducts(): Observable<Product[]> {
    const uri = 'products';
    return this.api.get<Product[]>(uri);
  }

  public getProduct(id: number): Observable<Product> {
      const uri = 'products/' + id;
      return this.api.get<Product>(uri);
  }
}
