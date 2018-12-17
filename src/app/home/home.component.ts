import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address';
import { AuthService } from '../services/auth.service';
import { ShareVariableService } from '../services/share-variable.service';
import { DistrictService } from '../services/district.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title,
    private cityService: CityService,
    private addressService: AddressService,
    private authService: AuthService,
    private districtService: DistrictService,
    private sharedService: ShareVariableService,
    private router: Router) { }

  public currentCity: City;
  public addresses: Address[];

  @Input() test: boolean;

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.isViewBreadCrumb = false;
    }, 0);
    if (localStorage.selectedCity == null) {
      this.router.navigateByUrl("change-city");
    }
    else {
      let currentUrl = this.router.parseUrl(this.router.url);
      if (currentUrl.root.children.primary.segments[0].path != localStorage.selectedCity) {
        localStorage.selectedCity = currentUrl.root.children.primary.segments[0].path;
      }
      this.getCurrentCity();
    }
  }

  public getCurrentCity() {
    this.cityService.getCityBySeoLink(localStorage.selectedCity).subscribe(data => {
      if (data == null) {
        this.router.navigateByUrl("change-city");
        localStorage.removeItem("selectedCity");
        return false;
      }
      this.currentCity = data;
      this.titleService.setTitle(data.cityName);
    }, error => {
      this.router.navigateByUrl("change-city");
    });
  }

  public gotoDistrict(id) {
    this.districtService.getDistrictById(id).subscribe(data => {
      this.router.navigateByUrl(localStorage.selectedCity + "/" + data.seoLink + "/shops");
    });
  }
}
