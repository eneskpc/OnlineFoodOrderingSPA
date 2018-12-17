import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    let activeRoute = window.location.pathname.substr(1).split('/');
    this.productService.getProductsBySeoLink(activeRoute[0]);
  }

  
}
