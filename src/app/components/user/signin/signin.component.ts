import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService  } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form:FormGroup;
  error:String ="";
  success:String = "";

  constructor(private auth:AuthService,private router:Router) {
    this.redirectToHome();
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl(null,{validators:[Validators.required,Validators.email]}),
      password:new FormControl(null,{validators:[Validators.required]}),

    })
  }
  onSubmit(){
    this.success = this.error = "";
    if(this.form.invalid){
      console.log("Form is invalid");
      return;
    }


    const email = this.form.value.email;
    const password = this.form.value.password;

    this.auth.signin({email,password})
    .then((data)=>{
      if(data.error){
        this.error = data.error;
        console.log("Error:"+data.error)
        console.log("Message:"+data.message);
      }else{
        //store user in cookies
        this.auth.authenticateUser(data,(next)=>{
          this.success = "Successfully signed in";

          let user = this.auth.isAuthenticated();
          // do redirection here
          if(user && user.user.role === 1){
            console.log("You are admin");

          }else if(user && user.user.role === 0){
            console.log("You are user ");
          }
          this.redirectToHome();

        })

      }
    })
    .catch(error=>{
      console.log("Error in sign in component: "+error.message);
      this.form.reset();


    })






  }
  redirectToHome = () =>{
    if(this.auth.isAuthenticated()){
      this.router.navigateByUrl("/");
    }
  }

}
