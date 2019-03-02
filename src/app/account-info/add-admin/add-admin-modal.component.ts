import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {error} from '@angular/compiler/src/util';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.css',
              '../../../../src/modal-styles.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm: FormGroup = new FormGroup({firstName: new FormControl()});
  admin: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

  }

  ngOnInit(): void {
    this.generateAddAdminForm();
  }

  addAdmin() {
    const name = (<HTMLInputElement>document.getElementById('new-admin-name')).value;
    const email = (<HTMLInputElement>document.getElementById('new-admin-email')).value;
    let password;

    if ((<HTMLInputElement>document.getElementById('new-admin-password')).value ===
      (<HTMLInputElement>document.getElementById('new-admin-password-repeat')).value) {
      password = (<HTMLInputElement>document.getElementById('new-admin-password')).value;
    } else {
      error('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }

    this.admin = new User(email, name, password, 'ADMIN');
    this.userService.addAdmin(this.admin);
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
