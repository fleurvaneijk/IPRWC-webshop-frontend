import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  admin: User = new User('', '', '', 'ADMIN');
  password1 = '';
  password2 = '';

  static openModal () {
    const modal = <HTMLElement>document.getElementById('addAdminForm');
    modal.style.display = 'block';
  }

  ngOnInit(): void {
  }

  addAdmin() {
    if (this.checkPassword()) {
      this.userService.addAdmin(this.admin);
    }
  }

  private checkPassword() {
    if (this.password1 === this.password2) {
      this.admin.setPassword(this.password1);
      return true;
    } else {
      alert('De twee ingevoerde wachtwoorden zijn niet hetzelfde');
    }
  }

  closeModal () {
    const modal = <HTMLElement>document.getElementById('addAdminForm');
    modal.style.display = 'none';
  }
}
