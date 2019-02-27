import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.css',
              '../../../../src/modal-styles.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm: FormGroup = new FormGroup({firstName: new FormControl()});

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.generateAddAdminForm();
  }

  addAdmin() {
  }

  private generateAddAdminForm() {
    this.addAdminForm = this.formBuilder.group({
      titleInput: ['', Validators.required],
      descriptionInput: [''],
      imageInput: [''],
      priceInput: ['', Validators.required]
    });
  }

  openModal () {
    const modal = <HTMLElement>document.getElementById('addAdminForm');
    modal.style.display = 'block';
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addAdminForm');
    modal.style.display = 'none';
  }
}
