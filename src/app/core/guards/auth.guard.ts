import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SellersService } from '../../modules/sellers/sellers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private SignupService: SellersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const jwtHelper: JwtHelperService = new JwtHelperService();
      const token = localStorage.getItem('token');
      const decodedToken = jwtHelper.decodeToken(token);
      
      if (!token || jwtHelper.isTokenExpired(token)) {
        window.localStorage.clear();
        this.router.navigateByUrl('vendedores/login');
        return false;
      }

      // this.SignupService.getVerifyAccess(decodedToken.sub)
      //     .subscribe(response => {

      //       // @ts-ignore
      //       if(token !== response.access_token) {
      //         window.localStorage.clear();
      //         this.router.navigateByUrl('vendedores/login');
      //         return false;
      //       }
      //     });
      
      return true;
  }
  
}
