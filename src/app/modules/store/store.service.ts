import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  items: any = [];

  constructor(public http: HttpClient) { }

  allProducts() {
    return this.http.get(`${environment.api_url}/api/products`);
  }

  companyProducts(store: number) {
    return this.http.get(`${environment.api_url}/api/product/${store}`);
  }

  addToCart(event) {
    this.items.push(event);
    console.log('data service: ', this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

}
