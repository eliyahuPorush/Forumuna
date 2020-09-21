import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
  posts = [
    {title: 'first post', text: 'post text...'},
    {title: 'secend post', text: 'post text...'},
    {title: 'third post', text: 'post text...'},
    {title: 'forth post',  text: 'post text...'}
  ]
  constructor() { }

  ngOnInit(): void {
  }
  PostClicked(){}

}
