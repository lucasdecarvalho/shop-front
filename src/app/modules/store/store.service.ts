import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) { }

  allProducts() {
    return this.http.get(`${environment.api_url}/api/products`);
  }

  companyProducts(id: number) {
    return this.http.get(`${environment.api_url}/api/products/${id}`);
  }

}
