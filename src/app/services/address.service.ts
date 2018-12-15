import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:8080";
  public addresses: Address[] = [];

  public getAddreses() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.get<Address[]>(this.path + "/addresses", { headers: headers }).subscribe(data => {
      this.addresses = data;
    });
  }

}