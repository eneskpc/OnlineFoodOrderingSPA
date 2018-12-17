import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  constructor(private shopService: ShopService,
    private router: Router) { }

  public cityRoute;
  public districtRoute;

  ngOnInit() {
    let activeRoute = window.location.pathname.substr(1).split('/');
    this.cityRoute = activeRoute[0];
    this.districtRoute = activeRoute[1];
    this.shopService.getShopsByDistrict(this.districtRoute);
  }

  goToShopBySeo(shopSeo) {
    this.router.navigateByUrl(shopSeo + "/products");
  }
}
