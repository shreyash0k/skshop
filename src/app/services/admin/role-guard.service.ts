import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot):boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    let token = JSON.parse(localStorage.getItem("jwt"))

    // decode the token to get its payload
    if(token){

      if (this.auth.isAuthenticated() && token.user.role == expectedRole) {
        console.log("you are admin");
        return true;
      }else{
        console.log("you are not admin");
        this.router.navigate(['']);
        return false;
      }
    }else{
      console.log("token not found");
      this.router.navigate(['']);
      return false;
    }



  }
}
