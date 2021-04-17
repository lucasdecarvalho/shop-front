import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { exit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  items: any = [];
  storage: any = [];
  groupByCompany: any = [];
  storaged: any = {};

  constructor(public http: HttpClient) { }

  allProducts() {
    return this.http.get(`${environment.api_url}/api/products`);
  }

  companyProducts(store: number) {
    return this.http.get(`${environment.api_url}/api/product/${store}`);
  }

  addToCart(event) {
    this.storaged = JSON.parse(localStorage.getItem('cart'));

    if(this.storaged){
       this.storaged.some(function(el) {
          if(el.id === event.id) {
          alert('ja tem');
          exit();
          }
        })
      }
    
      if(this.storaged !== null) {
        this.storaged.push(event);
      } else {
        this.items.push(event);
        this.storaged = this.items;
      }

    localStorage.setItem('cart', JSON.stringify(this.storaged));
  }

  getItems() {
    // return this.items;
    JSON.parse(localStorage.getItem('cart'));
  }

  clearCart() {
    this.items = [];
    this.storaged = [];
    localStorage.removeItem('cart');
  }

  payment(data: any) {
    return this.http.post(`${environment.api_url}/api/payment`, data);
  }

}
