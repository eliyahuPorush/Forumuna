import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  brand = environment.brand ;
  loginForm: FormGroup ;
  errorMessage ;
  helloMessage ;
  constructor(
    private router: Router,
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl("eliyahuporush@gmail.com", [Validators.email, Validators.required]),
      password : new FormControl("eliyahu6040", [Validators.required])
    }) ;
    this.authSRV.errorMessage.subscribe(err => this.errorMessage = err) ;
  }

  // need to navigate to forum list after user logs in
  // need to add validation
  onSubmit(){
    if(this.loginForm.valid){
      this.authSRV.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
        user => { this.router.navigate([''])}
      )}
    else{
      this.errorMessage = 'one of the fields is not valid... please try again' ;
    }

  }
  loginWithGoogle(){}
  onCreateAccount(){ this.router.navigate(['signUp'])}

}
