import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUPComponent implements OnInit {
  brand = environment.brand ;
  createAccountForm: FormGroup ;
  errorMessage ;
  spinner : boolean = false ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      alies: new FormControl(''),
    })
  }
  // need to add validation
  onSubmit(){
    if( // check if form is valid and password equal to passwordConfirm
      this.createAccountForm.valid && 
      this.createAccountForm.controls.password.value == this.createAccountForm.controls.passwordConfirm.value
    ){
      let form = this.createAccountForm.controls ;
      let alies = this.createAccountForm.controls.alies.value == '' ? 'default': this.createAccountForm.controls.alies.value ;
      this.spinner = true ;
      setTimeout(() => {
        this.authSRV.signup(form.name.value, form.email.value, form.password.value, form.passwordConfirm.value, alies) ;
      }, 2500)
    }
    else{
      this.errorMessage = 'One of your details is incorrect!' ;
    }
  }

}
