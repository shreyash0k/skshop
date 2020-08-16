import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {
  imagePreview: string;
  authState =null;
  error:String = ""
  success:String = ""
  products = []
  constructor(private auth:AuthService,private product:ProductService) {
    this.authState = auth.isAuthenticated();
    this.getAllProducts();

  }

  ngOnInit(): void {
  }
  getAllProducts(){
    this.product.getAllProducts().then(
      response=>{
        if(response.error){
          console.log("Error while fetching products");
          this.error = "Error while fetching products"
        }else{
          this.products = response;
        }
      }
    )
  }
  onDelete(productId){
    this.error = this.success= ""
    this.product.deleteProduct(productId,this.authState.user._id,this.authState.token)
    .then(respone=>{
      if(respone.error){
        this.error = "Error in deletion of product "
        console.log("Error in deleting product"+this.error);

      }else{
        this.getAllProducts()
        this.success = "Successfully Deleted product"

      }
    })
  }
  onUpdate(){

  }

}
