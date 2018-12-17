import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AuthService } from '../services/auth.service';
import { DistrictService } from '../services/district.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(private addressService: AddressService,
    private authService: AuthService,
    private districtService: DistrictService) { }

  public optionData: Select2OptionData[];
  public optionsForDistrict: Options;

  public model = {
    title: null,
    districtId: null,
    fullAddress: null,
    telephone: null
  };

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
