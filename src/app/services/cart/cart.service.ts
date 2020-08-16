import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {

   }
    //add to cart
  addToCart = (item)=>{
    let cart = [];
    if(typeof window !== undefined){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      console.log("itemId"+item._id);
      cart.forEach(element => {
        console.log("cartItemId"+element._id);

        if(element._id === item._id){

          return;
        }
      });
      cart.push({
        ...item
      })
      localStorage.setItem("cart",JSON.stringify(cart))


    }
  }
   //load cart items
  loadCart = ()=>{
    if(typeof window !== undefined){
      if(localStorage.getItem("cart")){
        return JSON.parse(localStorage.getItem("cart"))
      }
    }
  }
  //remove from cart
  removeFromCart = (productId)=>{
    let cart = []
    if(typeof window !== undefined){
      if(localStorage.getItem("cart")){
        cart =  JSON.parse(localStorage.getItem("cart"))
      }
      cart.map((product,index)=>{
         if(product._id === productId){
           cart.splice(index,1);
         }
      })
      localStorage.setItem("cart",JSON.stringify(cart))

    }
    return cart;

  }
  //check if cart is empty
  setCartEmpty = () =>{
    if(typeof window !== undefined){
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart",JSON.stringify(cart))
    }
  }
}
