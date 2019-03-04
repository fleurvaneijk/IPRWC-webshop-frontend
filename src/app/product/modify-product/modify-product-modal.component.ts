import {Component, OnInit} from '@angular/core';
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

  product: Product;
  modifiedProduct: Product;
  url;
  imagePath;
  imgURL: any;

  titleInput: string;
  descriptionInput: string;
  imageInput = [];
  priceInput: number;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  previewImage(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Alleen foto\'s worden ondersteund.');
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);

      this.product.images = [];
      this.product.images.push(this.url);
    }
  }

  modifyProduct() {

    console.log('product', this.product);

    console.log('titleinput value: ', this.titleInput);

    this.product.title = this.titleInput;
    this.product.description = this.descriptionInput;
    this.product.price = this.priceInput;

    console.log(this.product);

    // todo: this.product is undefined??

    this.productService.updateProduct(this.product);
  }

  openModal (product: Product) {
    this.product = new Product(product.title, product.description, product.images, product.price, product.id);
    console.log(this.product);
    this.fillForm();
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = document.getElementById('modifyProductForm');
    modal.style.display = 'none';
  }

  private fillForm() {

    console.log(this.product);


    // this.modifyProductForm.setValue({
    //   titleInput: this.product.title,
    //   descriptionInput: this.product.description,
    //   imageInput: this.product.images,
    //   priceInput: this.product.price
    // });

    this.titleInput = this.product.title;
    console.log(this.titleInput);
    this.descriptionInput = this.product.description;
    console.log(this.descriptionInput);
    this.priceInput = this.product.price;
    console.log(this.priceInput);


    // this.modifyProductForm.controls.descriptionInput.setValue(this.product.description);
    // console.log(this.modifyProductForm.controls.descriptionInput.value);
    // this.modifyProductForm.controls.priceInput.setValue(this.product.price);
    // console.log(this.modifyProductForm.controls.priceInput.value);

    console.log(this.product);


  }
}
