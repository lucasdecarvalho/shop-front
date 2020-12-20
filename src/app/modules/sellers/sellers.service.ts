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
    return this.http.post(`${environment.api_url}/api/seller/create`, data, this.httpOptions);
  }
  
  updateCompany(data: any) {
    return this.http.put(`${environment.api_url}/api/seller/update`, data, this.httpOptions);
  }

  sellerLogin(data: object) {
    return this.http.post(`${environment.api_url}/api/seller/login`, data, this.httpOptions);
  }
  
  sellerData() {
    return this.http.get(`${environment.api_url}/api/seller/data`, this.httpOptions);
  }
  
  verifyAccess(data: any) {
    return this.http.post(`${environment.api_url}/api/seller/verify-access`, data, this.httpOptions);
  }
  
}
