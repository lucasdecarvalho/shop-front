import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public signup: SignupService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const expectedRole = route.data.expectedRole;
      const token = localStorage.getItem('token');
      const typeAccount = localStorage.getItem('typeAccount');
      const tokenPayload = jwt_decode(token);

      // @ts-ignore
      // this.signup.sellerData(tokenPayload.sub)
      //       .subscribe(response => {

      //             // @ts-ignore
      //             if(!response.cnpj) {

      //               this.router.navigate(['login']);
      //               return false;
      //             }
      //       });

      if (typeAccount !== expectedRole) {

          this.router.navigateByUrl('login');
          return false;
      }

      return true;
  }
  
}
