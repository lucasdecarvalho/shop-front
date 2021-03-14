import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  protected httpOptions: object;
  protected httpOptions2: object;

  constructor(public http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
           "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS"
           })
      };
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  checkCnpj(cnpj: number) {
    return this.http.get(`http://www.receitaws.com.br/v1/cnpj/${cnpj}`);
  }
  
  createCompany(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/create`, data);
  }
  
  updateCompany(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/update?_method=PUT`, data);
  }

  sellerLogin(data: object) {
    return this.http.post(`${environment.api_url}/api/seller/login`, data, this.httpOptions);
  }
  
  sellerData() {
    return this.http.get(`${environment.api_url}/api/seller/data`, this.httpOptions);
  }
  
  store(id: any) {
    return this.http.get(`${environment.api_url}/api/store/${id}`);
  }
  
  addProduct(data: any) {
    return this.http.post(`${environment.api_url}/api/products`, data);
  }
  
  editProduct(id: any, data: any) {
    return this.http.post(`${environment.api_url}/api/products/${id}?_method=PUT`, data);
  }
  
  showProduct(id: any) {
    return this.http.get(`${environment.api_url}/api/products/${id}`);
  }
  
  showSellerByAlias(store: string) {
    return this.http.get(`${environment.api_url}/api/company/${store}`);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${environment.api_url}/api/products/${id}`);
  }
  
  verifyAccess(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/verify-access`, data, this.httpOptions);
  }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if(cep != '') {
      const validacep = /^[0-9]{8}$/;
      
          if(validacep.test(cep)) {
            
            return this.http.get(`//viacep.com.br/ws/${cep}/json`);
          }
    }
  }
  
}
