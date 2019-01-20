import {Component, OnInit} from '@angular/core';
import {ProductService} from './product/product.service';
import {Product} from './product/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService: ProductService) {

  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
      data => {
        this.products = data;
      }
      );
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
