import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators' ;
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null) ;
  currentUser: User ;
  domain: string = environment.domain ;
  errorMessage = new Subject<string>();
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }
  login(email: string, password: string){
    return this.http.get<User>(`${this.domain}users/login/${email}/${password}`, {headers: {"Access-Control-Allow-Origin": "*"}}).pipe(map(
      data => { 
        this.user.next(data) ;
        this.currentUser = data ;
      }
    ))
  }

  signup(name:string, email:string, password: string, passwordConfirm: string, alies: string){
    this.http.get<User>(`${this.domain}users/signup/${name}/${email}/${password}/${passwordConfirm}/${alies}`).
    subscribe((user:User) => {
      this.user.next(user);
      this.currentUser = user;
      this.router.navigate(['main'])
    }) ;
  }

  logout() {
    this.user.next(null) ;
    this.currentUser = null ;
    this.router.navigate(['main/login']) ;
  }
}
