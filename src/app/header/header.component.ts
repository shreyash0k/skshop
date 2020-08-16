import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  @Output() public sideNavToggle = new EventEmitter();

  authenticate =null;
  constructor(private auth:AuthService,private router:Router) {
    auth.authState.subscribe((status)=>{
      this.authenticate = status;

    })

  }

  ngOnInit(): void {
  }
  public onToggleSidenav = () =>{
    this.sideNavToggle.emit();
  }
  public onLogout = () =>{
    this.auth.signout(next=>{
      console.log("Signed out successfully");
      this.router.navigateByUrl('/signin');

    })
  }

}
