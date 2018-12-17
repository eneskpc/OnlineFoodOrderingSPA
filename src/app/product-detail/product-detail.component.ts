import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService,
    shoppingCartService: ShoppingCartService) { }

  public model;

  ngOnInit() {
  }


}
