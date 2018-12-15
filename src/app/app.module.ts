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
      AddressListComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgSelect2Module,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
