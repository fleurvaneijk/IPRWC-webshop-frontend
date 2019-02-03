import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  selectedId: number;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
        data => {
          this.processProductData(data);
        }
      );
  }

  processProductData(data) {
    data.map(entry => {
      this.products.push(new Product(entry.id, entry.title, entry.description, entry.images, entry.price));
    });
  }
}
