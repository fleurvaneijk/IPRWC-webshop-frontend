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

  constructor(private productService: ProductService,
              private authService: AuthorizationService,
              private formBuilder: FormBuilder) {

  }

  products: Product[] = [];
  selectedId: number;
  user: User;

  addProductForm: FormGroup = new FormGroup({firstName: new FormControl()});

  selectedFile: File;

  public imagePath;
  imgURL: any;
  public message: string;

  openModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'none';
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
      imageInput: [''],
      priceInput: ['', Validators.required]
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  previewImage(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  addProduct() {
    let product: Product;
    const title = <string><undefined><HTMLInputElement>this.addProductForm.controls.titleInput.value;
    const description = <string><undefined><HTMLInputElement>this.addProductForm.controls.descriptionInput.value;
    const image = <string><undefined><HTMLInputElement>this.addProductForm.controls.imageInput.value;
    const price = <number><undefined><HTMLInputElement>this.addProductForm.controls.priceInput.value;
    const images: string[] = [image];

    console.log(title, description, image, price);
    product = new Product(title, description, images, price);
    console.log(product);

    this.productService.addProduct(product).subscribe(
      success => {
        alert('Het product is succesvol toegevoegd.');
        window.location.reload();
      },
      error => {
        alert('Er ging iets mis. Het product is NIET toegevoegd.');
      }
    );
  }
}
