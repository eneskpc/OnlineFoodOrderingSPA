import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  constructor(private authService: AuthService, private addressService: AddressService) { }

  ngOnInit() {
  }



}
