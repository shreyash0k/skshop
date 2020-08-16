import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable, Subscriber, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authState;
  constructor(public jwtHelper: JwtHelperService) {
  this.authState = new BehaviorSubject(this.isAuthenticated());
  }
  //signup
  signup = (user)=>{
    return fetch(`${environment.apiUrl}/signup`,{
      method:"POST",
      headers:{
          Accept: "application/json",
          "Content-type":"application/json"
      },
      body:JSON.stringify(user),

    })
    .then(
      response =>{
        return response.json();
      }
    )
    .catch(err=>{
      console.log("Error:"+err);
    })
  }
  //signin
  signin = (user)=>{
    return fetch(`${environment.apiUrl}/signin`,{
      method:"POST",
      headers:{
          Accept: "application/json",
          "Content-type":"application/json"
      },
      body:JSON.stringify(user),

    })
    .then(
      response =>{
        return response.json();
      }
    )
    .catch(err=>{
      console.log("Error at sign in service :"+err);
    })
  }

  //signout
  signout = next =>{
    if(typeof window !="undefined"){
      localStorage.removeItem("jwt");
      this.authState.next(null)

      next();
      return fetch(`${environment.apiUrl}/signout`, {
        method: "GET"
      })
      .then(response => {
        console.log("signout success")
      })
      .catch(err => console.log("error in auth service signout:"+err.message));

    }

  }


  //authenticate user
  authenticateUser = (data,next)=>{
    if(typeof window !="undefined"){
      localStorage.setItem("jwt",JSON.stringify(data))
      this.authState.next(JSON.parse(localStorage.getItem("jwt")));
      next();

    }
  }

  //isauthenticated
  isAuthenticated = () =>{
    if(typeof window =="undefined"){
     return null;
    }
    if(localStorage.getItem("jwt")){
      const token = JSON.parse(localStorage.getItem("jwt"))
      if(this.jwtHelper.isTokenExpired(token.token)){
        return null;
      }else{
        return JSON.parse(localStorage.getItem("jwt"))
      }
    }else{
      return null;
    }
  }



}



