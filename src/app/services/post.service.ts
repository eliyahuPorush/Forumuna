import { HttpClient } from '@angular/common/http';
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
  posts: Post[] = [
    new Post('my first post', 'Eli', 'this is the content of the first post this is the content of the first post', 1, "eli", [new Answer(2, 1, 'stupid question'), new Answer(2, 1,"wonderfull question")],1),
    new Post('my secend post', 'check', 'this is the content of the first post this is the content of the first post', 2, "check", [new Answer(1, 2, 'stupid question'), new Answer(2, 1,"wonderfull question")],2),
    new Post('my third post', 'john', 'this is the content of the first post this is the content of the first post', 3, "john", [new Answer(3, 3, 'stupid question'), new Answer(2, 1,"wonderfull question")],3),
    new Post('my forth post', 'john', 'this is the content of the first post this is the content of the first post', 3, "john", [new Answer(3, 4, 'stupid question'), new Answer(2, 1,"wonderfull question")],4),
    new Post('my fifth post', 'check', 'this is the content of the first post this is the content of the first post', 2, "check", [new Answer(1, 5, 'stupid question'), new Answer(2, 1,"wonderfull question")],5),
    new Post('my sixe\'t post', 'Eli', 'this is the content of the first post this is the content of the first post', 1, "eli", [new Answer(1, 6, 'stupid question'), new Answer(2, 1,"wonderfull question")],6),
    new Post('my seven\'th post', 'check', 'this is the content of the first post this is the content of the first post', 2, "check", [new Answer(3, 7, 'stupid question'), new Answer(2, 1,"wonderfull question")],7)
  ];

  constructor(
    private http: HttpClient,
    ) { }
    
    
  getAnswers(postId: number) {
      return this.http.get(`${this.domain}forums/getAnswers/${postId}`) ;
  }

  addAnswer(answer: Answer) {
      this.http.post(`${this.domain}forums/addAnswer`, answer).subscribe(response => console.log("res: ", response))  ;
  }

  getPosts(){
      return this.http.get(`${this.domain}forums/getPosts`)
  }
  
  addNewPost(newForum: Post){
    return this.http.post<Post>(`${this.domain}forums/addNewForum`, newForum) ;  
  }
  getUsersPosts(user: User){
    
    return this.http.get(`${this.domain}forums/getUserPosts/${user.id}`)
  }
  deletePost(postID: number){
    return this.http.delete(`${this.domain}forums/deletePost/${postID}`)
  }
}
  