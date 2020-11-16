import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators' ;
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5'

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
    return this.http.get<User>(`${this.domain}users/login/${email}/${password}`).pipe(map(
      data => { 
        
        this.user.next(data) ;
        this.currentUser = data ;
      }
    ))
  }

  signup(name:string, email:string, password: string, passwordConfirm: string, image: string | ArrayBuffer){
    let newUser = {
      name,email,password,passwordConfirm,image
    }
    this.http.post<User>(`${this.domain}users/signup`,newUser).
    subscribe((user:User) => {
      this.user.next(user);
      this.currentUser = user;
      this.router.navigate(['main']) ;
    }) ;
  }
  updateProfile(profileData: FormData) {
    profileData.append('id', String(this.currentUser.id)) ;
    return this.http.post(`${this.domain}users/updateProfile`, profileData,{
      reportProgress: true,
      observe: 'events'
    })
  }

  uploadImageProfile(image){
    console.log('image: ', image);
    const i = new FormData().append('image', image) ;
    this.http.post(`${this.domain}users/uploadImageProfile`, image, {reportProgress: true,  // TODO - figure out why formData dosen't work.
      observe: 'events' }).subscribe(img => {
      console.log('image upload: ', img);
      
    }) ;
  }
  
  logout() {
    this.user.next(null) ;
    this.currentUser = null ;
    this.router.navigate(['main/login']) ;
  }
}
