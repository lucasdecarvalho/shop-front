import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const jwtHelper: JwtHelperService = new JwtHelperService();
      
      const token = localStorage.getItem('token');
      const decodedToken = jwtHelper.decodeToken(token);
      
      
      if (!token && jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      }
      
      console.log(decodedToken);
      return true;
  }
  
}
