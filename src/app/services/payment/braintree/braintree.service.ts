import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {

  constructor() { }
  getMeToken = (userId,token) =>{
    return fetch(`${environment.apiUrl}/payment/getToken /${userId}`,{
      method:"GET",
      headers:{
        Accept:"applicatoin/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`

      }
    }).then((response)=>{
      return response.json();
    })
    .catch((error)=>{
      console.log("Error in brantree payment service:"+error);

    })

  }

  processPayment = (userId,token,paymentInfo) =>{
    return fetch(`${environment.apiUrl}/payment/braintree/${userId}`,{
      method:"POST",
      headers:{
        Accept:"applicatoin/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`

      },
      body: JSON.stringify(paymentInfo)
    })
    .then((response)=>{
      return response.json();

    })
    .catch((error)=>{
      console.log("Error in payment service :"+error);
    })
  }
}
