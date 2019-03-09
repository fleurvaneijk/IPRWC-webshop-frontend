import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';
import {AuthorizationService} from '../shared/authorization.service';
import {User} from '../user/user';
import {AddProductComponent} from '../product/add-product/add-product-modal.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  user: User;

  constructor(private productService: ProductService,
              private authService: AuthorizationService,
              private addProductModal: AddProductComponent) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.authentication();
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
      this.products.push(new Product(entry.title, entry.description, entry.images, entry.price, entry.id));
    });
  }

  private authentication() {
    if (this.authService.getAuthenticator() !== null) {
      this.user = <User>this.authService.getAuthenticator();
    } else {
      this.user = new User('fill@fill.nl', 'fill', 'fillfill', 'NONE');
    }
  }

  openModal () {
    AddProductComponent.openModal();
  }
}
