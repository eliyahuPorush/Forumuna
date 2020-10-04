import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.authSRV.user.subscribe(user => {this.user = user})

  }
  userLogout(){
    this.authSRV.logout() ;
  }
}
