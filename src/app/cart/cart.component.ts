import {Component, Input, OnInit} from '@angular/core';
import {OrderedProduct} from './ordered-product';
import {CartService} from './cart.service';
import {AuthorizationService} from '../shared/authorization.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderedProducts: OrderedProduct[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService, private authService: AuthorizationService) { }

  ngOnInit() {
    this.cartService.retrieveCartFromCookie();
    this.orderedProducts = this.cartService.getCart();
  }

  makeTotalPrice() {
    this.totalPrice = 0;
    for (const product of this.orderedProducts) {
      const subtotal = product.price * product.amount;
      this.totalPrice += subtotal;
    }
    this.totalPrice = <number><unknown>this.totalPrice.toFixed(2);
  }

  checkout() {
    if (this.authService.getAuthenticator() == null) {
      alert('U moet eerst inloggen voor u kan bestellen');
    } else {
      this.cartService.deleteCookie();
      alert('Bedankt voor uw bestelling!');
      window.location.reload();
    }
  }
}
