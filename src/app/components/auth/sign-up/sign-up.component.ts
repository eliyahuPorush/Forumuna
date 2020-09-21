import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){}

}
