import { Component, OnInit } from '@angular/core';
import {Product} from '../product/product';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderedProducts: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.orderedProducts = this.cartService.getCart();
  }

}
