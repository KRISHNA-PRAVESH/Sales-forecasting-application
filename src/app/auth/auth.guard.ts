import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthServiceService,private router:Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      let isLoggedIn = this.authService.isAuthenticated()
     
      if(isLoggedIn){
        // console.log(isLoggedIn)
        return true;
      }
      else{
        this.router.navigate(['login']);
      }
      return isLoggedIn;
    
  }
  
}
