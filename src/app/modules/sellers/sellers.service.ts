import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  protected httpOptions: object;

  constructor(public http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
           "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
           "Authorization": "Bearer " + window.localStorage.getItem('token')
           })
      };
  }

  checkCnpj(cnpj: number) {
    return this.http.get(`http://www.receitaws.com.br/v1/cnpj/${cnpj}`);
  }
  
  createCompany(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/create`, data, this.httpOptions);
  }

  sellerLogin(data: object) {
    return this.http.post(`${environment.api_url}/api/seller/login`, data, this.httpOptions);
  }
  
  sellersList() {
    return this.http.get(`${environment.api_url}/api/seller/list`, this.httpOptions);
  }
  
  sellerData(data: any) {
    return this.http.get(`${environment.api_url}/api/seller/seller/${data}`, this.httpOptions);
  }
  
  verifyAccess(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/verify-access`, data, this.httpOptions);
  }
  
  getVerifyAccess(id: any) {
    return this.http.get(`${environment.api_url}/api/seller/verify-access/${id}`, this.httpOptions);
  }
  
}
