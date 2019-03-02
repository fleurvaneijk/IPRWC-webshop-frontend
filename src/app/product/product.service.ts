import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import { Product } from './product';
import 'rxjs-compat/add/operator/map';

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

  public addProduct(product: Product) {
    const uri = 'products';
    return this.api.post<Product>(uri, product).subscribe(
      success => {
        alert('Het product is succesvol toegevoegd.');
        window.location.reload();
      },
      error => {
        alert('Er ging iets mis. Het product is NIET toegevoegd.');
      }
    );
  }

  public updateProduct(product: Product) {
    const uri = 'products/' + product.id;
    return this.api.post<Product>(uri, product).subscribe(
      success => {
        alert('Het product is succesvol toegevoegd.');
        window.location.reload();
      },
      error => {
        alert('Er ging iets mis. Het product is NIET toegevoegd.');
      }
    );
  }

  public deleteProduct(product: Product): Observable<Product> {
    const uri = 'products/delete/' + product.id;
    return this.api.delete<Product>(uri);
  }
}
