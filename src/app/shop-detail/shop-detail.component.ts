import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Title } from '@angular/platform-browser';
import { ShopService } from '../services/shop.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  constructor(private productService: ProductService,
    private shopService: ShopService,
    private shoppingCartService: ShoppingCartService,
    private titleService: Title) { }

  ngOnInit() {
    let activeRoute = window.location.pathname.substr(1).split('/');
    this.productService.getProductsBySeoLink(activeRoute[0]);
    this.shopService.getShopBySeoLink(activeRoute[0]);

    var tryTitle = setInterval(() => {
      if (this.shopService.currentShop != null) {
        this.titleService.setTitle(this.shopService.currentShop.shopName);
        clearInterval(tryTitle);
      }
    }, 50);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id);
    var tryUnitPrice = setInterval(() => {
      if (this.shopService.currentShop != null) {
        this.shoppingCartService.unitPrice = this.productService.currentProduct.unitPrice;
        this.shoppingCartService.totalPrice = this.productService.currentProduct.unitPrice;
        clearInterval(tryUnitPrice);
      }
    }, 50);
  }
}
