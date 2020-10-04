import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null) ;
  errorMessage = new Subject<string>();
  constructor(private http: HttpClient) { }
  login(email: string, password: string){
    return this.http.get<User>(`http://localhost:3001/users/login/${email}/${password}`).pipe(map(
      data => this.user.next(data)
    ))
  }

  signup(name:string, email:string, password: string, passwordConfirm: string, alies: string){
    this.http.get(`http://localhost:3001/users/signup/${name}/${email}/${password}/${passwordConfirm}/${alies}`).
    subscribe(d => {
      console.log(d);
      
    }) ;
  }

  logout() {
    this.user.unsubscribe() ;
  }
}
