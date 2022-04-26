import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){}
  
  canActivate(){
      if(!this.authService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }else{
        return true;
      }
  }

  // checkUserRole(route: ActivatedRouteSnapshot){
  //   if(route.data.role == )
  // }
}
