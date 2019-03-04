import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {ProductService} from '../product.service';
import {CartService} from '../../cart/cart.service';
import {User} from '../../user/user';
import {AuthorizationService} from '../../shared/authorization.service';
import {ModifyProductComponent} from '../modify-product/modify-product-modal.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  images = [];
  title = '';
  description = '';
  price = 0;
  user: User;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private authService: AuthorizationService,
              private cartService: CartService,
              private modifyProductModal: ModifyProductComponent) {

  }

  ngOnInit() {
    this.getProduct();
    this.authentication();
  }

  private getProduct() {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.productService.getProduct(id).subscribe(
        data => {
          this.product = new Product(data.title, data.description, data.images, data.price, data.id);
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

  decrease1() {
    (<HTMLInputElement>document.getElementById('amount')).stepDown(1);
  }
  increment1() {
    (<HTMLInputElement>document.getElementById('amount')).stepUp(1);
  }

  addToCart(product: Product) {
    const amount: number = <number><unknown>(<HTMLInputElement>document.getElementById('amount')).value;
    this.cartService.addToCart(product, amount);
    alert('Het product is toegevoegd aan uw winkelwagen.');
  }

  deleteProduct(product: Product) {
    if (confirm('Weet u zeker dat u dit product wilt verwijderen?')) {
      this.productService.deleteProduct(product).subscribe(
        succes => {
          alert('Het product is succesvol verwijdert.');
          this.router.navigate(['/products']);
        },
        error => {
          alert('Het product kon NIET verwijdert worden.');
        }
      );
    }
  }

  private authentication() {
    if (this.authService.getAuthenticator() !== null) {
      this.user = <User>this.authService.getAuthenticator();
    } else {
      this.user = new User('fill@fill.nl', 'fill', 'fillfill', 'NONE');
    }
  }

  openModifyProductModal () {
    this.modifyProductModal.openModal(this.product);
  }
}
