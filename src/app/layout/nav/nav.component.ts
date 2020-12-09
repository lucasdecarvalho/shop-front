import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public items: Array<string>;
  protected httpOptions: object;

  constructor(private http: HttpClient, private router: Router, private breakpointObserver: BreakpointObserver) {
    this.items = ["item1", "item2", "item3"];

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

    alerta(event, item) {
      alert("Mensagem de teste. Item: " + item);
    }

    sellerLogout()
    {
      window.localStorage.clear();
      console.log("sai");
      this.router.navigateByUrl('login');
    }
  


}
