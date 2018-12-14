import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  jwtHelper: JwtHelperService = new JwtHelperService();
  public currentUser: User;

  public login(userModel): Observable<string> {
    if (userModel != null) {
      return this.http.post<string>("http://localhost:8080/auth", userModel);
    }
    return null;
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
}
