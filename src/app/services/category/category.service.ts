import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }
 //insert category
 createCategory= (userId,token,name)=>{


  return fetch(`${environment.apiUrl}/category/create/${userId}`,{
    method:"POST",
    headers:{

      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`

    },
    body:JSON.stringify(name)

  }).then((response)=>{
    return response.json()
  })
  .catch((err)=>{
    console.log("Error in category service:"+err.message);
  })
 }
//get one category

//get all categories
getAllCategories(){
  return fetch(`${environment.apiUrl}/categories`,{
    method:"GET",
  }).then((response)=>{
    return response.json();
  })
  .catch((err)=>{
    console.log("error in category service:"+err.message);
  })
}
//update one category by id
//delete categy by id
}
