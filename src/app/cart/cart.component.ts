import {Component, Input, OnInit} from '@angular/core';
import {OrderedProduct} from './ordered-product';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderedProducts: OrderedProduct[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) { }

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
    this.cartService.deleteCookie();
    alert('Bedankt voor uw bestelling!');
    window.location.reload();
  }
}
