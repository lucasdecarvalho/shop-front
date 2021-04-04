import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  createUser(data: any) {
    return this.http.post(`${environment.api_url}/api/user/create`, data);
  }
  
  updateUser(data: any) {
    return this.http.post(`${environment.api_url}/api/user/update?_method=PUT`, data);
  }

  userLogin(data: object) {
    return this.http.post(`${environment.api_url}/api/user/login`, data, this.httpOptions);
  }
  
  userData() {
    return this.http.get(`${environment.api_url}/api/user/data`, this.httpOptions);
  }

}