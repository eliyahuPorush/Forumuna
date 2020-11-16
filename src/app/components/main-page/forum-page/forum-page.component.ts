import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/models/answer.model';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  post: Post ;
  answers ;
  answerForm:FormGroup ;
  successMessage:string ;
  failedMessage:string ;
  spinner: boolean = false ;
  constructor(
    private postsSRV: PostService,
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.postsSRV.postClicked.subscribe((post:Post) => {
      this.post = post ;
    })
      this.postsSRV.getAnswers(this.post.id).subscribe(answers => {
        this.answers =  answers ;
        console.log("answers: ", answers);
      })

    this.answerForm = new FormGroup({
      answer: new FormControl(null, Validators.required)
    })
  }

  onAddAnswer(){
    if(this.answerForm.valid){
      let newAnswer = new Answer(this.authSRV.currentUser.id, this.post.id,this.answerForm.controls.answer.value) ;
      this.postsSRV.addAnswer(newAnswer) ;
      this.answerForm.setValue({answer:''}) ;
      this.spinner = true ;
      setTimeout(() => {
        this.successMessage = 'Your answer has been posted...' ;
        this.spinner = false ;
      }, 2500) ;
      this.postsSRV.getAnswers(this.post.id).subscribe(answers => {
        this.answers =  answers ;
      })
    }
    else this.failedMessage = "your answer is invalid."
  }

  // input field of new answer was focus - check if user login...
  answerAreaFocus(){
    if(!this.authSRV.currentUser){
      setTimeout(() => {
        this.failedMessage = "You need to login to add your answer..." ;
      }, 1500)
    }
  }
}