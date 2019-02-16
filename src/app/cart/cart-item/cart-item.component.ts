import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {OrderedProduct} from '../ordered-product';
import {CartComponent} from '../cart.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product: OrderedProduct;

  constructor(private cartService: CartService, private cartComponent: CartComponent) { }

  ngOnInit() {
  }

  decrease1() {
    (<HTMLInputElement>document.getElementById('amount')).stepDown(1);
    this.product.amount = (<number><unknown><HTMLInputElement>document.getElementById('amount'));
  }
  increment1() {
    (<HTMLInputElement>document.getElementById('amount')).stepUp(1);
    this.product.amount = (<number><unknown><HTMLInputElement>document.getElementById('amount'));
  }

  deleteItem() {
    this.cartService.removeFromCart(this.product);
    this.cartComponent.ngOnInit();
  }
}
