import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ImageHelperService,ImageConfig } from 'image-helper';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];

  img ;
  constructor(private auth:AuthService,private cartService:CartService, private productService:ProductService,public imgHelper:  ImageHelperService,private router: Router ) {

    productService.getAllProducts()
    .then(response=>{
      if(response.error){
        console.log("Could not load products error:"+response.error);

      }else{

        response.forEach(element => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = this.arrayBufferToBase64(element.photo.data.data);
        this.img = base64Flag + imageStr;
        element.img = this.img;
        });

        this.products = response;
        //load image

      }
    })
    .catch(err=>{
      console.log("Error in home component:"+err)
    })

  }



  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  ngOnInit() {

}
addToCart(product){
  this.cartService.addToCart(product);
  this.redirectToCart();

}
redirectToCart(){
  this.router.navigateByUrl("/cart");
}



}
