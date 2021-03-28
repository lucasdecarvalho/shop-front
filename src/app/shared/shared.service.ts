import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public http: HttpClient, public router: Router) { }
  
  search(keyword: any) {
    event.preventDefault();
    this.router.navigateByUrl('search/'+keyword);
  }
  
  searchResult(keyword: any) {
    return this.http.get(`${environment.api_url}/api/search?keyword=${keyword}`);
  }

}
