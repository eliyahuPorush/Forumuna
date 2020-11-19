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
  imgPath: string ;
  imageLoaded: File ;

  constructor(
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(this.authSRV.currentUser.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(this.authSRV.currentUser.email, [Validators.required, Validators.email]),
    }) ;
    this.imgPath =  this.authSRV.currentUser.profileImagePath
  }

onSubmit(){
  if(this.profileForm.valid){
    // send image 
    this.authSRV.uploadImageProfile(this.imageLoaded, this.authSRV.currentUser.email);

    let controlers = this.profileForm.controls ;
    let formData = new FormData() ;
    formData.append('name', controlers.name.value )
    formData.append('email', controlers.email.value )
    console.log("formData: ", formData.getAll);
    this.authSRV.updateProfile(formData).subscribe(
      e => console.log(e)
    )
  
}
}
onImgSelected(event){
  const imgFile = event.files[0] ;
  const fileReader = new FileReader() ;
  fileReader.onload = e =>   { 
    this.imgPath = e.target.result as string ;
    this.imageLoaded  = imgFile ;
  }
  fileReader.readAsDataURL(imgFile) ;
}

}