import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImageHelperService } from 'image-helper';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products = [];
  authState = null;
  img ;
  totalAmount = null;
  constructor(private auth:AuthService,private cartService:CartService,public imgHelper:  ImageHelperService,private router: Router,private orderService:OrderService ) {

    this.authState = auth.isAuthenticated();
    this.products = cartService.loadCart();

    this.getAmmount(this.products);
  }





  ngOnInit(): void {
  }

  removeFromCart(productId){

     this.products = this.cartService.removeFromCart(productId);
  }
  getAmmount= (products)=>{
    let amount = 0;
    products.forEach(p => {
      console.log("ammount of p is:"+p.price);
      amount = amount + p.price;
    });

    this.totalAmount= amount;
  }
  onBuyClick(){




    this.cartService.setCartEmpty();
    this.products = [];


  }
}
