import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';
import {forEach} from '@angular/router/src/utils/collection';
import {AuthorizationService} from '../shared/authorization.service';
import {User} from '../user/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  selectedId: number;
  user: User;

  addProductForm: FormGroup = new FormGroup({firstName: new FormControl()});

  openModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'none';
  }

  constructor(private productService: ProductService,
              private authService: AuthorizationService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.authentication();
    this.generateAddProductForm();
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

  private authentication() {
    if (this.authService.getAuthenticator() !== null) {
      this.user = <User>this.authService.getAuthenticator();
    } else {
      this.user = new User('fill@fill.nl', 'fill', 'fillfill', 'NONE');
    }
  }

  private generateAddProductForm() {
    this.addProductForm = this.formBuilder.group({
      titleInput: ['', Validators.required],
      descriptionInput: [''],
      // imageInput: [''],
      priceInput: ['', Validators.required]
    });
  }
}
