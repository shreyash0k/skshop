import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuradService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {

   }
   canActivate():boolean{
    if (this.auth.isAuthenticated()) {
      return true;
    }else{
      this.router.navigate(['/signin']);
      return false;
    }
   }

}
