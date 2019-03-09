import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['../../../../src/modal-styles.css']
})
export class AddProductComponent {

  constructor(private productService: ProductService) {
  }

  product: Product = new Product('', '', [], null);
  imgURL: any;

  static openModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
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

  addProduct() {
    this.product.price = <number><unknown>this.product.price.toFixed(2);
    this.productService.addProduct(this.product);
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'none';
  }
}
