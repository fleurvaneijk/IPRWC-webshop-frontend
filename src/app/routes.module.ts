import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';

export const routes: Routes =
  [
    { path: '', component: ShopComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'products', component: ShopComponent },
    { path: 'products/:id', component: ProductInfoComponent },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
