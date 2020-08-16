import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  form:FormGroup;
  authState
  error:String ="";
  success:String = "";
  constructor(private auth:AuthService,private router:Router,private category:CategoryService) {
    this.authState = auth.isAuthenticated();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      categoryName:new FormControl(null,{validators:[Validators.required,Validators.minLength(2)]}),

    })
  }

  onSubmit(){
    this.success = this.error = "";
    const name = this.form.value.categoryName;
    if(this.form.invalid){
      console.log("Form is invalid");
      return;
    }

    if(this.authState){

      console.log("token:"+this.authState.token);
      console.log("userId"+this.authState.user._id);

      console.log("CategoryName"+name);
      this.category.createCategory(this.authState.user._id,this.authState.token,{name}).then(
        (response)=>{
          if(response.error){
            this.error=response.error;
          }else{
            this.form.reset();
            this.success  ="Successfully Created Category";
            console.log("Successfullly Created Category")
          }
        }
      )
    }

  }

}
