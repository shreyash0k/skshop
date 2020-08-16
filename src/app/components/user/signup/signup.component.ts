import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  error:String  ="";
  success:String = "";

  constructor(private auth:AuthService,private router:Router) {
      this.redirectToHome();
   }

  ngOnInit(): void {
    this.form = new FormGroup({


      name:new FormControl(null,{validators:[Validators.required,Validators.minLength(2)]}),
      email:new FormControl(null,{validators:[Validators.required,Validators.email]}),
      password:new FormControl(null,{validators:[Validators.required,Validators.minLength(6)]}),

    })
  }
  onSubmit(){
    this.success = this.error = "";
    if(this.form.invalid){
      console.log("Form is invalid");
      return;
    }



    const name = this.form.value.name;
    const email = this.form.value.email;
    const password = this.form.value.password;


    this.auth.signup({name,email,password})
    .then(data=>{
      if(data.error){
        this.error = data.error;
        console.log("Error:"+data.error)
        console.log("Message:"+data.message);

      }else{

        this.success = "Successfully Created Account now sign in "
        console.log("Successfully signned up now log in");
        this.router.navigateByUrl('/signin')


      }
    })
    .catch(error=>{
      console.log("Error in sign up component: "+error.message);
      this.form.reset();


    })



  }
  redirectToHome = () =>{
    if(this.auth.isAuthenticated()){
      this.router.navigateByUrl("/");
    }
  }

}
