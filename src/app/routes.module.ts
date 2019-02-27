import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { CartComponent } from './cart/cart.component';
import { AccountInfoComponent } from './account-info/account-info.component';

export const routes: Routes =
  [
    { path: '', component: ShopComponent },
    { path: 'products', component: ShopComponent },
    { path: 'products/:id', component: ProductInfoComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountInfoComponent },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
