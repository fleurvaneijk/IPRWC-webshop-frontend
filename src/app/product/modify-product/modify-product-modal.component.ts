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
export class ModifyProductComponent implements OnInit {

  @Input() product: Product;
  url;
  imagePath;
  imgURL: any;

  // titleInput: string;
  // descriptionInput: string;
  // imageInput = [];
  // priceInput: number;


  constructor(private productService: ProductService) {
    console.log('constructor was used');
  }

  ngOnInit(): void {
  }

  previewImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
        this.product.images = [];
        this.product.images.push(this.imgURL);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    // if (files.length === 0) {
    //   return;
    // }
    //
    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   alert('Alleen foto\'s worden ondersteund.');
    //   return;
    // }
    //
    // const reader = new FileReader();
    // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    //   this.product.images = [];
    //   this.product.images.push(this.imgURL);
    // };
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);

    const path = event.target.value;
    console.log(path);
    this.previewImage(event);


    // if (event.target.files && event.target.files[0]) {
    //   const reader = new FileReader();
    //
    //   reader.onload = (event: ProgressEvent) => {
    //     this.url = (<FileReader>event.target).result;
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    // }
  }

  modifyProduct() {

    console.log('product', this.product);

    console.log('title: ', this.product.title);
    console.log('description value: ', this.product.description);
    console.log('price value: ', this.product.price);
    this.product.price = <number><unknown>this.product.price.toFixed(2);
    console.log('price value: ', this.product.price);

    this.productService.updateProduct(this.product);
  }

  openModal () {
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'none';
  }
}
