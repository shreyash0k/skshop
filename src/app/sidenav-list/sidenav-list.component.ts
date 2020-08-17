import { Component, OnInit,Output,EventEmitter  } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
   @Output() sidenavClose = new EventEmitter();

  authenticate =null;

  constructor(private auth:AuthService,private router:Router) {
    auth.authState.subscribe((status)=>{
      this.authenticate = status;

    })

  }

  ngOnInit(): void {
  }
  public onSideNavClose = () =>{
        this.sidenavClose.emit();
  }
  public onLogout = () =>{
    this.auth.signout(next=>{
      console.log("Signed out successfully");
      this.router.navigateByUrl('/signin');
      this.onSideNavClose();
    })
  }



}
