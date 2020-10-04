import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
  posts ;

  constructor(
    private postsSRV: PostService,
    private router: Router, 
    private ActivateRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.postsSRV.getPosts().subscribe(posts => {
      this.posts = posts
    }); 
  }
  PostClicked(post){
    console.log("post clicked");
    
    this.router.navigate(['main','forum', post.name])
  }

}
