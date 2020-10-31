import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  formData: FileReader = new FileReader() ;
  imageUrl: string | ArrayBuffer ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      image: new FormControl(null),
    })
  }
  // need to add validation
  onSubmit(){
    if( // check if form is valid and password equal to passwordConfirm
      this.createAccountForm.valid && 
      this.createAccountForm.controls.password.value == this.createAccountForm.controls.passwordConfirm.value
    ){
      let form = this.createAccountForm.controls ;
      this.spinner = true ;
      setTimeout(() => {
        this.authSRV.signup(form.name.value, form.email.value, form.password.value, form.passwordConfirm.value, this.imageUrl) ;
      }, 2500)
    }
    else{
      this.errorMessage = 'One of your details is incorrect!' ;
    }
  
  }
  onLoadImg(e){
    let image =  e.target.files[0] ;
    this.formData = new FileReader() ;
    this.formData.readAsDataURL(image) ;
    this.formData.onload = e =>  {this.imageUrl = e.target.result}
  }

}
