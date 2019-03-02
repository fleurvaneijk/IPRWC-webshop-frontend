import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ShopComponent} from '../../shop/shop.component';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product-modal.component.html',
  styleUrls: ['../../../../src/modal-styles.css']
})
export class ModifyProductComponent implements OnInit {

  product: Product;
  url;
  imagePath;
  imgURL: any;
  modifyProductForm: FormGroup = new FormGroup({firstName: new FormControl()});

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.generateModifyProductForm();
  }

  private generateModifyProductForm() {
    this.modifyProductForm = this.formBuilder.group({
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

  modifyProduct() {
    let product: Product;
    const title = this.modifyProductForm.controls.titleInput.value;
    const description = this.modifyProductForm.controls.descriptionInput.value;
    const price = this.modifyProductForm.controls.priceInput.value;
    const images: string[] = [];
    images.push(this.url);

    product = new Product(title, description, images, price);

    //todo: pass id
    this.productService.updateProduct(product);
  }

  openModal (product: Product) {
    this.product = product;
    const modal = <HTMLElement>document.getElementById('modifyProductForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('modifyProductForm');
    modal.style.display = 'none';
  }
}
