import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  URL: string = "http://127.0.0.1:8000/api/register";
  api_response: string = ""



  constructor(private formBuilder: FormBuilder, private httpservice: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", {
        validators: [
          Validators.required
        ]
      }],
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
    this.registerCallback = this.registerCallback.bind(this);
    this.registerErrorCallback = this.registerErrorCallback.bind(this);
    this.httpservice.register(this.form, this.registerCallback, this.registerErrorCallback)
  }


  registerCallback(data) {
    console.log('success', data);
    this.api_response = "Sucessfully registered"
    this.router.navigate(["/login"]);
  }

  registerErrorCallback(error) {
    console.log('oops', error);
    if (error.error && error.error.email) {
      this.api_response = error.error.email;
    }
    else {
      this.api_response = "Error Occured";
    }

  }

}
