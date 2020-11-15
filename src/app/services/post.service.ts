import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from 'process';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postClicked = new BehaviorSubject<Post>(null);
  domain: string = environment.domain ;

  constructor(
    private http: HttpClient,
    private authSRV: AuthService
    ) { }
    
    
  getAnswers(postId: number) {
      return this.http.get(`${this.domain}forums/getAnswers/${postId}`) ;
  }

  getPosts(){
      return this.http.get(`${this.domain}forum/getPosts`)
  }
  getUsersPosts(user: User){
    return this.http.get(`${this.domain}forum/getUserPosts/${user.id}`)
  }
  addAnswer(answer: Answer) {
      this.http.post(`${this.domain}forums/addAnswer`, answer).subscribe(response => console.log("res: ", response))  ;
  }

  
  addNewPost(newForum: Post){
    return this.http.post(`${this.domain}forum/addNewForum`, newForum, {headers: {'token': this.getToken()}}) ;  
  }

  
  deletePost(postID: number){
    return this.http.delete(`${this.domain}forum/deletePost/${postID}`, { headers: {'token': this.getToken()}})
  }


  private getToken(){
    return this.authSRV.currentUser['token'] ;
  }

}