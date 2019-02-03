import { Injectable } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';
import {Product} from '../product/product';

@Injectable()
export class CartService {

  orderedProducts: Product[] = [];

  constructor(private api: ApiService) {
  }

  public addToCart(product: Product) {
    this.orderedProducts.push(product);
    console.log(this.orderedProducts);
  }

  public getCart() {
    return this.orderedProducts;
  }
}
