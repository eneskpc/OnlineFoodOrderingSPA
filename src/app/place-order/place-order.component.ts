import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { AddressService } from '../services/address.service';
import { PaymentMethod } from '../models/payment-method';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  constructor(private titleService: Title,
    private router: Router,
    private http: HttpClient,
    private shoppingService: ShoppingCartService,
    private addressService: AddressService) { }

  public addressByBasketShop: Address[];
  public selectedAddress: Address;

  public selectedPaymentMethod: PaymentMethod;

  public orderNote: string;

  ngOnInit() {
    setTimeout(() => {
      this.titleService.setTitle("Siparişi Tamamla");
    }, 0);
    this.shoppingService.basket = this.shoppingService.getShoppingCart();
    if (!this.shoppingService.basket)
      this.router.navigateByUrl("/");
    this.shoppingService.calcPriceforBasket();
    this.addressService.getAddresses();
    let filterAddresses = setInterval(() => {
      if (this.addressService.addresses.length > 0) {
        this.addressByBasketShop = this.addressService.getAddressesByBasketShop();
        clearInterval(filterAddresses);
      }
    }, 100);
  }

  onSelectAddress(addressId: number) {
    this.selectedAddress = this.addressByBasketShop.filter(a => a.id == addressId)[0];
  }

  onSelectPaymentMethod(paymentMethodId: number) {
    this.selectedPaymentMethod = this.shoppingService.basket[0].product.shop.paymentMethods.filter(p => p.id == paymentMethodId)[0];
  }

  onSaveOrder() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", `Bearer ${localStorage.token}`);

    this.http.post("http://localhost:8080/order", {
      shopId: this.shoppingService.basket[0].product.shop.id,
      userAddressId: this.selectedAddress,
      orderNote: this.orderNote,
      paymentMethodId: this.selectedPaymentMethod
    }, { headers: headers }).subscribe(data => {
      
    });
  }
}
