import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ShopComponent} from '../../shop/shop.component';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product-modal.component.html',
  styleUrls: ['../../../../src/modal-styles.css']
})
export class ModifyProductComponent {

  constructor(private productService: ProductService) {
  }

  @Input() product: Product;
  imgURL: any;

  static openModal () {
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'block';
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    const path = event.target.value;
    this.previewImage(event);
  }

  previewImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
        this.product.images = [];
        this.product.images.push(this.imgURL);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  modifyProduct() {
    this.product.price = <number><unknown>this.product.price.toFixed(2);
    this.productService.updateProduct(this.product);
  }

  closeModal () {
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'none';
  }
}
