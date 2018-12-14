import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Shop } from '../models/Shop';
import { AuthService } from '../services/auth.service';
import { ShopService } from '../services/shop.service';
import { AddressService } from '../services/address.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private shopService: ShopService) {
  }

  public loginError;

  public model: any = {
    username: "",
    password: ""
  };

  public processing: boolean = false;

  ngOnInit() {
    this.loggedUser();
  }

  login() {
    this.loginError = null;
    this.processing = true;
    let loginResponse = this.authService.login(this.model);
    if (loginResponse != null)
      loginResponse.subscribe(tokenData => {
        localStorage.setItem("token", tokenData["token"]);
        this.loggedUser();
        this.processing = false;
        this.model.username = "";
        this.model.password = "";
      }, tokenError => {
        this.processing = false;
        this.loginError = tokenError.message;
      });
    else
      this.processing = false;
  }

  getCurrentShop() {
    if (this.authService.isAdmin) {
      this.shopService.getCurrentShop().subscribe(data => {
        this.shopService.currentShop = data;
      });
    }
  }

  loggedUser() {
    if (this.authService.isAuthenticated) {
      return this.authService.loggedUser().subscribe(userData => {
        this.authService.currentUser = userData;
        this.getCurrentShop();
      });
    }
  };
}
