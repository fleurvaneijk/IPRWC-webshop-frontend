import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesModule } from './routes.module';
import { PublicModule } from './public.module';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ShopComponent} from './shop/shop.component';
import { ProductComponent } from './shop/product/product.component';
import {ProductService} from './shop/product/product.service';


@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
    PublicModule,
    SharedModule,
    HomeModule,
    UserModule,
  ],
  exports: [ PublicModule ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ShopComponent,
    ProductComponent
  ],
  providers: [
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
