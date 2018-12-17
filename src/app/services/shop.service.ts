import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../models/Shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  public currentShop: Shop;
  public shops: Shop[];

  getCurrentShop() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.get<Shop>("http://localhost:8080/userShop", { headers: headers }).subscribe(data => {
      this.currentShop = data;
    });
  }

  getShopsByDistrict(districtRoute) {
    this.http.get<Shop[]>("http://localhost:8080/shops/" + districtRoute).subscribe(data => {
      this.shops = data;
    });
  }

  getSeoUrl(textString) {
    textString = textString.replace(/ /g, "-");
    textString = textString.replace(/&lt;/g, "");
    textString = textString.replace(/&gt;/g, "");
    textString = textString.replace(/"/g, "");
    textString = textString.replace(/é/g, "");
    textString = textString.replace(/!/g, "");
    textString = textString.replace(/'/, "");
    textString = textString.replace(/£/, "");
    textString = textString.replace(/^/, "");
    textString = textString.replace(/#/, "");
    textString = textString.replace(/$/, "");
    textString = textString.replace(/\+/g, "");
    textString = textString.replace(/%/g, "");
    textString = textString.replace(/½/g, "");
    textString = textString.replace(/&amp;/g, "");
    textString = textString.replace(/\//g, "");
    textString = textString.replace(/{/g, "");
    textString = textString.replace(/\(/g, "");
    textString = textString.replace(/\[/g, "");
    textString = textString.replace(/\)/g, "");
    textString = textString.replace(/]/g, "");
    textString = textString.replace(/=/g, "");
    textString = textString.replace(/}/g, "");
    textString = textString.replace(/\?/g, "");
    textString = textString.replace(/\*/g, "");
    textString = textString.replace(/@/g, "");
    textString = textString.replace(/€/g, "");
    textString = textString.replace(/~/g, "");
    textString = textString.replace(/æ/g, "");
    textString = textString.replace(/ß/g, "");
    textString = textString.replace(/;/g, "");
    textString = textString.replace(/,/g, "");
    textString = textString.replace(/`/g, "");
    textString = textString.replace(/|/g, "");
    textString = textString.replace(/\./g, "");
    textString = textString.replace(/:/g, "");
    textString = textString.replace(/İ/g, "i");
    textString = textString.replace(/I/g, "i");
    textString = textString.replace(/ı/g, "i");
    textString = textString.replace(/ğ/g, "g");
    textString = textString.replace(/Ğ/g, "g");
    textString = textString.replace(/ü/g, "u");
    textString = textString.replace(/Ü/g, "u");
    textString = textString.replace(/ş/g, "s");
    textString = textString.replace(/Ş/g, "s");
    textString = textString.replace(/ö/g, "o");
    textString = textString.replace(/Ö/g, "o");
    textString = textString.replace(/ç/g, "c");
    textString = textString.replace(/Ç/g, "c");
    textString = textString.replace(/--/g, "-");
    textString = textString.replace(/---/g, "-");
    textString = textString.replace(/----/g, "-");
    textString = textString.replace(/----/g, "-");
    return textString.toLowerCase();
  }

}
