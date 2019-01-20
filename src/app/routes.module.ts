import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ListComponent } from './user/list/list.component';
import {ShopComponent} from './shop/shop.component';
import {ProductInfoComponent} from './product/product-info/product-info.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes =
  [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: ListComponent },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ShopComponent, children: [
      { path: ':id', component: ProductInfoComponent }]
    },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
