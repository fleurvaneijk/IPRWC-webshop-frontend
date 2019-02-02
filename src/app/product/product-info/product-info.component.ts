import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  private product: Product;
  // private shoppingBasket:ShoppingBasket;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {

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
        },
        error => {
          this.router.navigateByUrl('/', {queryParams: {error: 'Product kon niet gevonden worden.'}});
        }
      );
    });
  }

  // addToBasket() {
  //   if (AuthorisationService.isLoggedIn) {
  //     const uri = '/api/shoppingbasket/insertShoppingbasketProduct';
  //     this.shoppingBasket = new ShoppingBasket();
  //     this.shoppingBasket.email = AuthorisationService.email;
  //     this.shoppingBasket.product_id = this.product.Product_id;
  //     this.shoppingBasket.amount = 1;
  //     this.api.post(uri, this.shoppingBasket).subscribe();
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

}
