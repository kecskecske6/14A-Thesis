import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  type: string = '';

  constructor(private router: Router, private authService: AuthService, private userService: UserService){}
  
  canActivate(next: ActivatedRouteSnapshot){
      if(!this.authService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }else{
        if(this.checkUserRole(next)) return true;
        this.router.navigate(['/']);
        return false;
      }
  }

  checkUserRole(route: ActivatedRouteSnapshot): boolean{
    this.userService.getTypeOfTheUser(this.userService.getUserId()).subscribe(result => {this.type = result});
    if(route.data.role == this.type || route.data.role == "any") return true;
    return false;
  }
}
