import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesModule } from './routes.module';
import { PublicModule } from './public.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ShopComponent} from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from './product/product.service';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import {RegisterComponent} from './user/login-register/register/register.component';
import {LoginRegisterComponent} from './user/login-register/login-register.component';
import {LoginComponent} from './user/login-register/login/login.component';
import {UserService} from './user/user.service';


@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
    PublicModule,
    SharedModule
  ],
  exports: [ PublicModule ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ShopComponent,
    ProductComponent,
    ProductInfoComponent,
    RegisterComponent,
    LoginRegisterComponent,
    LoginComponent
  ],
  providers: [
    ProductService,
    UserService,
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
