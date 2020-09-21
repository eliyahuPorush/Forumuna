import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){}
  loginWithGoogle(){}
  onCreateAccount(){ this.router.navigate(['signUp'])}

}
