import { Component } from '@angular/core';
import {ProductService} from './product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {

  products = this.getAllProducts();

  constructor(private productService: ProductService) {

  }

  getAllProducts() {
    this.productService.getAllProducts();
  }
}
