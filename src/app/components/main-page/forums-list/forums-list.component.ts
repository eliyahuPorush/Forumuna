import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
  posts ;
  constructor(private postsSRV: PostService) { }

  ngOnInit(): void {
    this.postsSRV.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }
  PostClicked(){}

}
