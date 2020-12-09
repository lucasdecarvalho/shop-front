import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignupService } from './signup.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private SignupService: SignupService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const jwtHelper: JwtHelperService = new JwtHelperService();
      const token = localStorage.getItem('token');
      const decodedToken = jwtHelper.decodeToken(token);
      let Modifyedtoken = localStorage.getItem('token');
      
      if (!token && jwtHelper.isTokenExpired(token)) {
        window.localStorage.clear();
        this.router.navigateByUrl('login');
        return false;
      }

      this.SignupService.getVerifyAccess(decodedToken.sub)
          .subscribe(response => {

            // @ts-ignore
            if(token !== response.access_token) {
              window.localStorage.clear();
              this.router.navigateByUrl('login');
              return false;
            }
          });
      
      return true;
  }
  
}
