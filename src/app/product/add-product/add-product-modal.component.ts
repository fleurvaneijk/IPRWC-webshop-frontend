import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ShopComponent} from '../../shop/shop.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['../../../../src/modal-styles.css']
})
export class AddProductComponent implements OnInit {

  url;
  imagePath;
  imgURL: any;
  addProductForm: FormGroup = new FormGroup({firstName: new FormControl()});

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.generateAddProductForm();
  }

  private generateAddProductForm() {
    this.addProductForm = this.formBuilder.group({
      titleInput: ['', Validators.required],
      descriptionInput: [''],
      imageInput: [''],
      priceInput: ['', Validators.required]
    });
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
    }
  }

  addProduct() {
    let product: Product;
    const title = this.addProductForm.controls.titleInput.value;
    const description = this.addProductForm.controls.descriptionInput.value;
    const price = this.addProductForm.controls.priceInput.value;
    const images: string[] = [];
    images.push(this.url);

    product = new Product(title, description, images, price);

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

  openModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addProductForm');
    modal.style.display = 'none';
  }
}
