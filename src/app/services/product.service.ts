import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:8080";
  public products: Product[];
  public currentProduct: Product;

  getProductsBySeoLink(shopSeo) {
    this.http.get<Product[]>(this.path + '/products/' + shopSeo).subscribe(data => {
      this.products = data;
    });
  }

  getProductById(id) {
    this.http.get<Product>(this.path + '/product/' + id).subscribe(data => {
      this.currentProduct = data;
    });
  }

  clearCurrentProduct() {
    this.currentProduct = null;
  }

}
