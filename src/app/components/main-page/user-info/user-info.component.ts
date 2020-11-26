import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PrivateMessageService } from 'src/app/services/privateMessages.service';
import { environment } from 'src/environments/environment' ;
 
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User ;
  spinner: boolean = false ;
  imgUserUrl: string ;
  domain: string = environment.domain ;
  messages;
  constructor(
    private authSRV: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.authSRV.user.subscribe(async user => {
      if(!!user){
        user.profileImagePath = this.domain + user.profileImagePath ;
      }
      this.user = user ;
    })

 }
  userLogout(){
    this.spinner = true ;
    setTimeout(() => {
      this.authSRV.logout() ;
      this.spinner = false ;
    }, 500)
  }

}
