import { Component, OnInit } from '@angular/core';
import {OrderedProduct} from './ordered-product';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderedProducts: OrderedProduct[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.retrieveCartFromCookie();
    this.orderedProducts = this.cartService.getCart();
  }

  checkout() {
    this.cartService.deleteCookie();
    alert('Bedankt voor uw bestelling!');
    window.location.reload();
  }
}
