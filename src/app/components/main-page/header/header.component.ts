import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  brand = environment.brand ;
  user: User ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.authSRV.user.subscribe(user => {this.user = user})
    
  }

}