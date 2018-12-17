import { Injectable } from '@angular/core';
import { BasketProduct } from '../models/basket-product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  public basket: BasketProduct[];

  addShoppingCart(newBasketProduct) {
    let thisBP = this.basket.filter(f => f.product === newBasketProduct.product && f.unitPrice === newBasketProduct.unitPrice);
    if (thisBP.length == 0) {
      newBasketProduct.id = Math.random().toString(36).substr(2);
      this.basket.push(newBasketProduct);
    } else {
      thisBP[this.basket.indexOf(thisBP[0])].quantity = thisBP[0].quantity + newBasketProduct.quantity;
    }
  }

}
