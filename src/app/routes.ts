import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SpecialLayoutComponent } from './special-layout/special-layout.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddressListComponent } from './address-list/address-list.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

export const routes: Routes = [
  {
    path: '',
    component: SpecialLayoutComponent,
    children: [{
      path: '',
      component: PageSelectorComponent,
      pathMatch: 'full'
    }, {
      path: 'change-city',
      component: ChangeCityComponent
    }, {
      path: 'place-order',
      component: PlaceOrderComponent
    }]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: 'profile',
      component: UserProfileComponent
    }, {
      path: 'addresses',
      component: AddressListComponent
    }, {
      path: ':citySeo/welcome',
      component: HomeComponent
    }, {
      path: ':citySeo/:districtSeo/shops',
      component: ShopsComponent
    }, {
      path: ':shopSeo/products',
      component: ShopDetailComponent
    }]
  }
];