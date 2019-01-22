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

  processProductData(data) {
    data.map(entry => {
      this.products.push(new Product(entry.product_id, entry.title, entry.description, entry.imagePath, entry.price));
    });
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
      data => {
        this.processProductData(data);
      }
      );
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
