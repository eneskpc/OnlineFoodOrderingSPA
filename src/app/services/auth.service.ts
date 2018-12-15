import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private addressService: AddressService) { }

  jwtHelper: JwtHelperService = new JwtHelperService();
  public currentUser: User;

  public login(userModel) {
    if (userModel != null) {
      this.http.post<string>("http://localhost:8080/auth", userModel).subscribe(data => {
        localStorage.setItem("token", data["token"]);
        this.loggedUser().subscribe(userData => {
          this.currentUser = userData;
          if (this.isUser) {
            this.addressService.getAddreses();
          }
        });
      });
    }
  }

  public logout() {
    localStorage.removeItem("token");
  }

  public loggedUser(): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    return this.http.get<User>("http://localhost:8080/user", { headers: headers });
  };

  get isAuthenticated() {
    if (!localStorage.token)
      return false;
    return !this.jwtHelper.isTokenExpired(localStorage.token);
  }

  public get isAdmin() {
    if (this.currentUser == null)
      return false;
    return this.currentUser.authorities.filter(a => a.authority == "ROLE_ADMIN").length > 0;
  }

  public get isResponsible() {
    if (this.currentUser == null)
      return false;
    return this.currentUser.authorities.filter(a => a.authority == "ROLE_RESPONSIBLE").length > 0;
  }

  public get isUser() {
    if (this.currentUser == null)
      return false;
    return this.currentUser.authorities.filter(a => a.authority == "ROLE_USER").length > 0;
  }
}
