import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SpecialLayoutComponent } from './special-layout/special-layout.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    }]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: 'profile',
      component: UserProfileComponent
    }, {
      path: ':citySeo/welcome',
      component: HomeComponent
    }]
  }
];