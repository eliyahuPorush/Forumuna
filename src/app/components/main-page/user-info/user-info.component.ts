import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User ;
  spinner: boolean = false ;
  imgUserUrl: string ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.authSRV.user.subscribe(user => {
      this.user = user ;
    })
 }
  userLogout(){
    this.spinner = true ;
    setTimeout(() => {
      this.authSRV.logout() ;
      this.spinner = false ;
    }, 3000)
  }

}
