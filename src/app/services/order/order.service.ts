import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() {

  }

  //create order
  createOrder= (userId, token,order) =>{

    console.log("order without strinify"+order);
    console.log("order with strinify"+JSON.stringify(order));

    return fetch(`${environment.apiUrl}/order/create/${userId}`,{
      method:"POST",
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({ order: order })
    })
    .then(response=>{
      return response.json();
    })
    .catch(error=>{
      console.log("Error in order service:"+error.message);
    })
  }

  //empty cart
  emptyCart = () =>{
    if(typeof window !==undefined ){
      localStorage.removeItem("cart");
    }
  }
}
