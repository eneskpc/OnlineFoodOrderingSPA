import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:8080";
  public addresses: Address[] = [];
  public currentAddress: Address = null;

  public getAddresses() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.get<Address[]>(this.path + "/addresses", { headers: headers }).subscribe(data => {
      this.addresses = data;
    });
  }

  public getAddressById(addressId) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.get<Address>(this.path + '/address/' + addressId, { headers: headers }).subscribe(data => {
      this.currentAddress = data;
    });
  }

  public addAddress(model) {
    Swal({
      title: 'Adresiniz ' + (this.currentAddress != null ? 'Güncelleniyor...' : 'Kaydediliyor...'),
      html: 'Bu süreç içerisinde lütfen bekleyin ve ekranı kapatmayın. Aksi takdirde işleminiz gerçekleşmeyebilir.',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    let addPath = this.path + "/address";
    if (this.currentAddress != null) {
      addPath = addPath + "/" + this.currentAddress.id;
    }

    if (!model.title && this.currentAddress) {
      model.title = this.currentAddress.title;
    }

    if (!model.districtId && this.currentAddress) {
      model.districtId = this.currentAddress.district.id;
    }

    if (!model.fullAddress && this.currentAddress) {
      model.fullAddress = this.currentAddress.fullAddress;
    }

    if (!model.telephone && this.currentAddress) {
      model.telephone = this.currentAddress.telephone;
    }

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.post<boolean>(addPath, model, { headers: headers }).subscribe(response => {
      if (response) {
        Swal({
          title: 'Harika',
          text: `Adresinizi başarıyla ${(this.currentAddress != null ? 'güncellendik' : 'kaydettik')}! Artık doyalım!`,
          type: 'success'
        });
        this.getAddresses();
      }
    }, error => {
      Swal({
        title: 'Opps!',
        html: `Bir hata oluştu! Daha sonra tekrar deneyin veya nerede hata aldığınızı detaylı şekilde bize iletin. <a href='mailto:teknikdestek@orderfoodordering.com'>teknikdestek@orderfoodordering.com</a>`,
        type: 'error'
      });
    });
  }

  public deleteAddressById(id) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);
    this.http.delete<boolean>(this.path + "/address/" + id, { headers: headers }).subscribe(response => {
      if (response) {
        Swal({
          title: 'Adres silindi',
          text: 'Olsun! Varolan bir adresiniz ile de sipariş verebilir veya başka bir adres girebilirsiniz.',
          type: 'success'
        });
        this.getAddresses();
      }
    }, error => {
      Swal({
        title: 'Opps!',
        html: `Bir hata oluştu! Daha sonra tekrar deneyin veya nerede hata aldığınızı detaylı şekilde bize iletin. <a href='mailto:teknikdestek@orderfoodordering.com'>teknikdestek@orderfoodordering.com</a>`,
        type: 'error'
      });
    });
  }

  public resetCurrentAddress() {
    this.currentAddress = null;
  }


}