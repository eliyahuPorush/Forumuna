import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup ;
  errorMessage: string ;
  imgFile: File  ;
  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(this.authSRV.currentUser.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(this.authSRV.currentUser.email, [Validators.required, Validators.email]),
      image: new FormControl(null)
    })
  }
onSubmit(){
  if(this.profileForm.valid){
    let controlers = this.profileForm.controls ;
    let formData = new FormData() ;
    formData.append('profile-img', this.imgFile, this.imgFile.name) ;
    formData.append('name', controlers.name.value )
    formData.append('email', controlers.email.value )
    console.log("formData: ", formData.getAll);
    
    this.authSRV.updateProfile(formData).subscribe(
      e => console.log(e)
    )
  
}
}
onImgSelected(event){
  this.imgFile = event.target.files[0] ;
}

}