import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    ) {
      // get token from local storage if it exists and signin with
      const token = localStorage.getItem('forumuna user token') ;
      if(token){
        this.getUserByToken(token).subscribe(user => {
          this.login(user.email, user['password']).subscribe(() => {this.router.navigate([''])})
        }) ;
      }
     }


  login(email: string, password: string){
    return this.http.get<User>(`${this.domain}users/login/${email}/${password}`).pipe(map(
      data => { 
        localStorage.setItem('forumuna user token',data['token'])  // insert token to local storage
        this.getUserImage(data['token']).subscribe(img => this.convertImageToUrl(img))
        this.user.next(data) ;
        this.currentUser = data ;
      }
    ))
  }

  signup(name:string, email:string, password: string, passwordConfirm: string, image: string | ArrayBuffer){
    let newUser = {
      name,email,password,passwordConfirm,image
    }
    return this.http.post<User>(`${this.domain}users/signup`,newUser).
      pipe(map((user:User) => {
        this.user.next(user);
        this.currentUser = user;
        this.router.navigate(['main']) ;
    })) ;
  }
  updateProfile(profileData: FormData) {
    profileData.append('id', String(this.currentUser.id)) ;
    return this.http.post(`${this.domain}users/updateProfile`, profileData,{
      reportProgress: true,
      observe: 'events'
    })
  }

  uploadImageProfile(image, userEmail){
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.domain}users/uploadImageProfile/${userEmail}`, formData) 
  }
  
  logout() {
    this.user.next(null) ;
    this.currentUser = null ;
    localStorage.removeItem('forumuna user token') ;
    this.router.navigate(['main/login']) ;
  }
  getUserByToken(token: string){
    return this.http.get<User>(`${this.domain}users/getUserByToken/${token}`)
  }

  getUserImage(token){
    return this.http.get(`${this.domain}users/getProfileImage/${token}`,{ responseType: 'blob'}) 
  }

  convertImageToUrl(image){
    const fileReader = new FileReader() ;
    fileReader.onload = e =>{
    this.currentUser.profileImagePath = e.target.result as string ;
    }
    fileReader.readAsDataURL(image) ;
  }

}
