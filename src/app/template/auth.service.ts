import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected httpOptions: object;

  constructor(public http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
           "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
           Authorization: "Bearer " + window.sessionStorage.getItem("token")
           })
      };
  }

  checkCnpj(cnpj: number) {
    return this.http.get(`http://www.receitaws.com.br/v1/cnpj/${cnpj}`);
  }
  
  create(data: any) {
    return this.http.post(`${environment.api_url}/api/company`, data, this.httpOptions);
  }
  
  getUserDetails(data: object) {
    return this.http.post(environment.api_url + "/api/login", data, this.httpOptions);
  }
  
}
