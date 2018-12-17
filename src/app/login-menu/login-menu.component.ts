import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ShopService } from '../services/shop.service';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private shopService: ShopService,
    private router: Router,
    private addressService: AddressService) {
  }
  public loginError;

  public model: any = {
    username: "",
    password: ""
  };

  ngOnInit() {
  }
}
