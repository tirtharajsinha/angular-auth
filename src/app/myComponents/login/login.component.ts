import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { UserObject } from '../../user-object';
import { Emitters } from '../emitters/emitters';

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



  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
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
    this.http.post(this.URL, this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(
      data => {
        console.log('success', data);
        this.api_response = "Sucessfully Logged In"
        this.userService.FetchUser();
        this.router.navigate(["/"]);
      },
      error => {
        console.log('oops', error);
        this.api_response = error.error.detail;
      }
    )
  }


  loadUser() {
    this.user = this.userService.user;
    Emitters.authEmitter.subscribe(
      (userdata: UserObject) => {
        this.user = userdata;
        // console.log(this.user);
      }
    );
  }

}
