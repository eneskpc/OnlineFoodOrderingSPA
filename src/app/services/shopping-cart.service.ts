import { Injectable } from '@angular/core';
import { BasketProduct } from '../models/basket-product';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import 'sweetalert2';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private productService: ProductService,
    private http: HttpClient) { }

  public selectedOptions: any[] = null;
  public quantity = 1;
  public unitPrice = 0;
  public totalPrice = 0;
  public totalPriceForBasket: number = 0;

  public basket: BasketProduct[];

  addShoppingCart() {
    let tempProduct: Product = new Product();
    tempProduct.id = this.productService.currentProduct.id;
    tempProduct.shop = this.productService.currentProduct.shop;
    tempProduct.unitPrice = this.unitPrice;
    tempProduct.productName = this.productService.currentProduct.productName;

    let tempItemOptionsText: string = "";

    for (let i = 0; i < this.selectedOptions.length; i++) {
      if (this.selectedOptions[i].length == 0)
        continue;
      if (!tempProduct.productItems)
        tempProduct.productItems = [];
      tempProduct.productItems.push({
        id: this.productService.currentProduct.productItems[i].id,
        itemName: this.productService.currentProduct.productItems[i].itemName,
        itemType: this.productService.currentProduct.productItems[i].itemType,
        productId: this.productService.currentProduct.productItems[i].productId,
        productItemOptions: null
      });

      tempProduct.productItems[tempProduct.productItems.length - 1].productItemOptions = [];
      this.selectedOptions[i].forEach(value => {
        let tempItemOption = this.productService.currentProduct.productItems[i].productItemOptions.filter(x => x.id == parseInt(value))[0];
        tempProduct.productItems[tempProduct.productItems.length - 1].productItemOptions.push(tempItemOption);
        tempItemOptionsText += ", " + tempItemOption.optionName;
        tempProduct.productItems[tempProduct.productItems.length - 1].productItemOptions = tempProduct.productItems[tempProduct.productItems.length - 1].productItemOptions.sort((leftSide, rightSide) => {
          return leftSide.id < rightSide.id ? -1 : (leftSide.id > rightSide.id ? 1 : 0);
        });
      });
      if (tempItemOptionsText.length > 0)
        tempItemOptionsText = tempItemOptionsText.substr(1);
    }
    tempProduct.productItems = tempProduct.productItems.sort((leftSide, rightSide) => {
      return leftSide.id > rightSide.id ? -1 : (leftSide.id < rightSide.id ? 1 : 0);
    });
    if (!this.basket)
      this.basket = [];
    let matchedProductIndex = -1;
    for (let index = 0; index < this.basket.length; index++) {
      if (JSON.stringify(this.basket[index].product) == JSON.stringify(tempProduct)) {
        matchedProductIndex = index;
        break;
      }
    }
    if (matchedProductIndex > -1) {
      this.basket[matchedProductIndex].quantity += this.quantity;
    } else {
      this.basket.push({
        id: Math.random().toString(36).substr(2),
        product: tempProduct,
        quantity: this.quantity,
        unitPrice: this.unitPrice,
        optionsText: tempItemOptionsText
      });
    }

    localStorage.shoppingCart = JSON.stringify(this.basket);
    this.calcPriceforBasket();

    this.selectedOptions = null;
  }

  public getShoppingCart(): BasketProduct[] {
    if (localStorage.shoppingCart)
      return JSON.parse(localStorage.shoppingCart);
    return null;
  }

  onChangeQuantityFromBasket(basketItemId: string, newQuantity: number) {
    if (this.basket) {
      this.basket.filter(item => item.id == basketItemId)[0].quantity = newQuantity;
      localStorage.shoppingCart = JSON.stringify(this.basket);
      this.calcPriceforBasket();
    }
  }

  deleteFromBasket(basketItemId: string) {
    if (this.basket) {
      let basketItemIndex = this.basket.indexOf(this.basket.filter(item => item.id == basketItemId)[0])
      this.basket.splice(basketItemIndex, 1);
      localStorage.shoppingCart = JSON.stringify(this.basket);
      this.calcPriceforBasket();
    }
  }

  areYouSureDelete(basketItemId: string) {
    let basketItemIndex = this.basket.indexOf(this.basket.filter(item => item.id == basketItemId)[0]);
    swal({
      title: "Emin misin?",
      html: "<strong>" + this.basket[basketItemIndex].product.productName + "</strong>" + " sepetinizden kaldırılacak.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır"
    }).then(result => {
      if (result.value) {
        this.deleteFromBasket(basketItemId);
        swal(
          'Kaldırıldı!',
          '',
          'success'
        );
      }
    });
  }

  onChange(optionId: number, isChecked: boolean, arrayIndex: number) {
    if (!this.selectedOptions) {
      this.selectedOptions = [];
      this.productService.currentProduct.productItems.forEach(item => {
        this.selectedOptions.push([]);
      });
    }

    if (isChecked) {
      this.selectedOptions[arrayIndex].push(optionId);
    } else {
      let index = this.selectedOptions[arrayIndex].indexOf(optionId);
      this.selectedOptions[arrayIndex].splice(index, 1);
    }
    this.calcPrice();
  }

  onChangeForDropdown(optionId: number, arrayIndex: number) {
    if (!this.selectedOptions) {
      this.selectedOptions = [];
      this.productService.currentProduct.productItems.forEach(item => {
        this.selectedOptions.push([]);
      });
    }
    this.selectedOptions[arrayIndex] = [optionId];
    this.calcPrice();
  }

  calcPrice() {
    this.unitPrice = this.productService.currentProduct.unitPrice;
    for (let i = 0; i < this.selectedOptions.length; i++) {
      for (let j = 0; j < this.selectedOptions[i].length; j++) {
        this.unitPrice += this.productService.currentProduct.productItems[i].productItemOptions.filter(
          value => value.id == this.selectedOptions[i][j])[0].priceDifference;
      }
    }
    this.totalPrice = this.unitPrice * this.quantity;
  }

  calcPriceforBasket() {
    this.totalPriceForBasket = 0;
    if (this.basket)
      this.basket.forEach(element => {
        this.totalPriceForBasket += element.quantity * element.unitPrice;
      });
  }

  clearSelectedOptions() {
    this.selectedOptions = null;
    this.quantity = 1;
  }

  increase() {
    this.quantity++;
    if (this.quantity > 99)
      this.quantity = 99;
    this.totalPrice = this.quantity * this.unitPrice;
  }

  decrease() {
    this.quantity--;
    if (this.quantity < 1)
      this.quantity = 1;
    this.totalPrice = this.quantity * this.unitPrice;
  }

  updateQuantity(newQuantity: number) {
    if (newQuantity)
      this.quantity = newQuantity;
    else
      this.quantity = 1;
    this.totalPrice = this.quantity * this.unitPrice;
  }

}
