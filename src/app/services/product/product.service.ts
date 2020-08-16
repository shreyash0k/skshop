import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

   }
  //create a produt




  createProduct= (userId,token,product) =>{
    console.log("uploading product "+product+" name"+product.name+"userId"+userId+" token"+token);
    return fetch(`${environment.apiUrl}/product/create/${userId}`,{
      method:"POST",
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
      },
      body:product

    })
    .then((response)=>{
      console.log("Response is :"+response);
      return response.json();
    })
    .catch((error)=>{
      console.log("Error in product service: "+error.message);

    })
  }
  //get all products
  getAllProducts= () =>{
     return fetch(`${environment.apiUrl}/products`,{
       method:"GET"
     })
     .then((response)=>{
       return response.json();
     })
     .catch((err)=>{
      console.log("Error in product service: "+err.message);
     })
  }
  //get one product
  getProduct = (productId ) =>{

    return fetch(`${environment.apiUrl}/product/${productId}`,{
      method:"GET"
    })
    .then((response)=>{
      return response.json();
    })
    .catch((err)=>{
     console.log("Error in product service: "+err.message);
    })
  }
  //delete product
  deleteProduct= (productId,userId,token) =>{
    return fetch(`${environment.apiUrl}/product/${productId}/${userId}`,{
      method:"DELETE",
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((response)=>{
      return response.json();
    })
    .catch((err)=>{
     console.log("Error in product service: "+err.message);
    })
 }
  //upate product
  updateProduct= (productId, userId,token,product) =>{
    return fetch(`${environment.apiUrl}/product/${productId}/${userId}`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
      },
      body:product
    })
    .then((response)=>{
      return response.json();
    })
    .catch((err)=>{
     console.log("Error in product service: "+err.message);
    })
 }


}
