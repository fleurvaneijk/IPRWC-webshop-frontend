import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {ProductService} from '../product.service';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  private product: Product;
  private images = [];
  private title = '';
  private description = '';
  private price = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,
              private cartService: CartService) {

  }

  ngOnInit() {
    this.getProduct();
  }

  private getProduct() {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.productService.getProduct(id).subscribe(
        data => {
          this.product = data;
          this.images = this.product.images;
          this.title = this.product.title;
          this.description = this.product.description;
          this.price = this.product.price;
        },
        error => {
          this.router.navigateByUrl('/', {queryParams: {error: 'Product kon niet gevonden worden.'}});
        }
      );
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    alert('Het product is toegevoegd aan uw winkelwagen.');
  }

}
