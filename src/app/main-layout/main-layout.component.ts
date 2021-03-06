import { Component, OnInit, ViewChild } from '@angular/core';
import { DistrictService } from '../services/district.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { Title } from '@angular/platform-browser';
import { ShareVariableService } from '../services/share-variable.service';
import { AuthService } from '../services/auth.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private districtService: DistrictService,
    private titleService: Title,
    private sharedService: ShareVariableService,
    private authService: AuthService,
    private addressService: AddressService) { }

  public optionData: Select2OptionData[];
  public optionsForDistrict: Options;


  ngOnInit() {
    this.optionsForDistrict = {
      theme: 'bootstrap4',
      placeholder: 'Bir semt seçin'
    };
    this.getOptionData();
    this.authService.loggedUser().subscribe(userData => {
      this.authService.currentUser = userData;
      if (this.authService.isUser) {
        this.addressService.getAddresses();
      }
    });
  }

  public getOptionData() {
    this.districtService.getDistricts().subscribe(data => {
      this.optionData = [];
      data.forEach(value => {
        this.optionData.push({
          id: '' + value.id,
          text: value.districtName + ' (' + value.city.cityName + ')'
        });
      });
    });
  }

}
