import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public displayedColumns = ['fullName', 'postcode', 'streetnumber', 'emailAddress'];
  public dataSource = null;

  constructor(private userService: UserService) {
    this.getUsersList();
  }

  private getUsersList() {
    this.userService.getAll().subscribe(
      users => {
        this.dataSource = new ListDataSource(users);
      }
    );
  }

  public hasData() {
    return this.dataSource !== null;
  }
}
