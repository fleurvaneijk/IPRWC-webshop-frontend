import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutesModule } from './routes.module';
import { PublicModule } from './public.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopComponent} from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { RegisterComponent } from './user/login-register/register/register.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { LoginComponent } from './user/login-register/login/login.component';
import { UserService } from './user/user.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountInfoComponent } from './account-info/account-info.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAdminComponent } from './account-info/add-admin/add-admin-modal.component';
import { AddProductComponent } from './product/add-product/add-product-modal.component';
import { ModifyProductComponent } from './product/modify-product/modify-product-modal.component';


@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
    PublicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
    LoginComponent,
    CartComponent,
    AccountInfoComponent,
    CartItemComponent,
    AddAdminComponent,
    AddProductComponent,
    ModifyProductComponent
  ],
  providers: [
    ProductService,
    UserService,
    CartService,
    CookieService,
    AddProductComponent,
    AddAdminComponent,
    ModifyProductComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
