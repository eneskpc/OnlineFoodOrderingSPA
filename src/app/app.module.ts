import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SpecialLayoutComponent } from './special-layout/special-layout.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddressListComponent } from './address-list/address-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { AddAddressComponent } from './add-address/add-address.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

export const ngxMaskOptions = {};

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoginMenuComponent,
      MainLayoutComponent,
      SpecialLayoutComponent,
      ChangeCityComponent,
      PageSelectorComponent,
      UserProfileComponent,
      AddressListComponent,
      AddAddressComponent,
      ShopsComponent,
      ShopDetailComponent,
      ShoppingCartComponent,
      ProductDetailComponent,
      PlaceOrderComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgSelect2Module,
      FormsModule,
      HttpClientModule,
      NgxMaskModule.forRoot(ngxMaskOptions)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
