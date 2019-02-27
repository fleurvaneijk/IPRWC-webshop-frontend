import { Injectable } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { Product } from '../product/product';
import { AppComponent } from '../app.component';
import { OrderedProduct } from './ordered-product';
import {ProductService} from '../product/product.service';


@Injectable()
export class CartService {

  orderedProducts: OrderedProduct[] = [];

  constructor(private api: ApiService, private productService: ProductService) {
  }

  public addToCart(product: Product, amount: number) {
    let addAmount = false;
    // Checks if product is already in cart, then add the amount
    for (let i = 0; i < this.orderedProducts.length; i++) {
      if (this.orderedProducts[i].product_id === product.id) {
        this.orderedProducts[i].amount = (Number(this.orderedProducts[i].amount) + Number(amount));
        addAmount = true;
      }
    }
    // If the product is not yet in the cart, a new orderedProduct is made
    if (addAmount === false) {
      const newProduct: OrderedProduct = new OrderedProduct(product.id, product.title, product.images[0], product.price, amount);
      this.orderedProducts.push(newProduct);
    }
    this.storeCartToCookie();
  }

  public removeFromCart(product: OrderedProduct) {
    for (let i = 0; i < this.orderedProducts.length; i++) {
      if (this.orderedProducts[i].product_id === product.product_id) {
        this.orderedProducts.splice(i, 1);
      }
    }
    this.storeCartToCookie();
  }

  public changeAmount(product: OrderedProduct) {
    for (let i = 0; i < this.orderedProducts.length; i++) {
      if (this.orderedProducts[i].product_id === product.product_id) {
        this.orderedProducts[i].amount = product.amount;
      }
    }
    this.storeCartToCookie();
  }

  public getCart() {
    return this.orderedProducts;
  }

  public storeCartToCookie() {
    const cookie = [];

    for (const orderedProduct of this.orderedProducts) {
      const cookieIdAmount = [orderedProduct.product_id, orderedProduct.amount];
      cookie.push(cookieIdAmount);
    }
    this.storeInCookie('cart', JSON.stringify(cookie));
  }

  public retrieveCartFromCookie() {
    this.orderedProducts = [];

    if (this.retrieveFromCookie('cart') !== '') {
      const cookie = JSON.parse(this.retrieveFromCookie('cart'));

      // Cookie = [productId, amount]
      for (const item of cookie) {
        let product: Product;

        this.productService.getProduct(item[0]).subscribe(
          data => {
              product = new Product(data.title, data.description, data.images, data.price, data.id);

            const orderedProduct: OrderedProduct = new OrderedProduct(product.id, product.title, product.images[0], product.price, item[1]);

            this.orderedProducts.push(orderedProduct);
          });
      }
    }
  }

  private storeInCookie(key: string, any: any) {
    AppComponent.cookieService.set(key, any);
  }

  private retrieveFromCookie(key: string): any {
    return AppComponent.cookieService.get(key);
  }

  public deleteCookie() {
    AppComponent.cookieService.delete('cart');
  }
}
