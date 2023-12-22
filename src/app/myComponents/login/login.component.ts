import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { UserObject } from '../../user-object';
import { Emitters } from '../emitters/emitters';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  URL: string = "http://localhost:8000/api/login";
  api_response: string = ""
  user: UserObject;



  constructor(private formBuilder: FormBuilder, private httpservice: HttpService, private router: Router, private userService: UserService) {
    this.loadUser();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      password: ["", {
        validators: [
          Validators.required
        ]
      }]
    });
  }

  submit(): void {
    this.loginCallback = this.loginCallback.bind(this);
    this.loginErrorCallback = this.loginErrorCallback.bind(this);
    this.httpservice.login(this.form, this.loginCallback, this.loginErrorCallback)
  }



  loginCallback(data) {
    console.log('success', data);
    this.api_response = "Sucessfully Logged In"
    this.userService.FetchUser();
    this.router.navigate(["/"]);
  }

  loginErrorCallback(error) {
    this.api_response = error.error.detail;
  }


  async loadUser() {
    this.user = await this.userService.currentUser();
    Emitters.authEmitter.subscribe(
      (userdata: UserObject) => {
        this.user = userdata;
        // console.log(this.user);
      }
    );
  }

}
