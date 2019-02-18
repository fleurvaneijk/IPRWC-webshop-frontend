import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
    if (this.product.amount !== 0) {
      this.product.amount--;
      this.cartService.changeAmount(this.product);
      this.cartComponent.makeTotalPrice();
    }
  }

  increment1() {
    this.product.amount++;
    this.cartService.changeAmount(this.product);
    this.cartComponent.makeTotalPrice();
  }

  deleteItem() {
    this.cartService.removeFromCart(this.product);
    this.cartComponent.ngOnInit();
  }
}
