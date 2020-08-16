import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  imagePreview: string;
  authState =null;
  error:String = ""
  success:String = ""
  form:FormGroup;
  categories = [];
  constructor(private category:CategoryService,private product:ProductService,private auth:AuthService) {

    this.authState = auth.isAuthenticated();
    category.getAllCategories().then((categories)=>{
      if(categories.error){
        console.log("Error while fetching categories");
        this.error = "Error while fetching categories"
      }else{
       this.categories = categories;
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      description:new FormControl(null,{validators:[Validators.required]}),
      price:new FormControl(null,{validators:[Validators.required]}),
      category: new FormControl(null,{validators:[Validators.required]}),
      stock:new FormControl(null,{validators:[Validators.required]}),
      photo: new FormControl(null,{validators: [Validators.required]} ),

    })
  }
  onSubmit(){
    console.log(this.form.value)
    this.success = this.error = "";
    if(this.form.invalid){
      console.log("Form is invalid");
      return;
    }
    let name = this.form.value.name
    let desc = this.form.value.description
    let stock = this.form.value.stock
    let price = this.form.value.price
    let photo = this.form.value.photo
    let category = this.form.value.category

    var formData: any = new FormData();
    formData.append("name",this.form.value.name);
    formData.append("description",this.form.value.description);
    formData.append("stock",this.form.value.stock);
    formData.append("price",this.form.value.price);
    formData.append("photo",this.form.value.photo);
    formData.append("category",this.form.value.category._id);
    if(this.authState){
      this.product.createProduct(this.authState.user._id,this.authState.token,formData)
      .then((response)=>{
        if(response.error){
          this.error = "Error in adding product "
          console.log("Error uploading product "+response.error);
        }else{
          this.success = "Successfully Added the product"
          this.imagePreview = null;
          this.form.reset();
        }
      })
      .catch(error=>{
        console.log("Error in addProduct component"+error.message);
      })
    }else{
      console.log("not authenticated");
    }

  }
  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      photo:file
    });
    this.form.get('photo').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
