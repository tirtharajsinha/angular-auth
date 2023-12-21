import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  URL: string = "http://127.0.0.1:8000/api/register";
  api_response: string = ""



  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required, Validators.email],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit(): void {
    this.http.post(this.URL, this.form.getRawValue()).subscribe(
      data => {
        console.log('success', data);
        this.api_response = "Sucessfully registered"
        this.router.navigate(["/login"]);
      },
      error => {
        console.log('oops', error);
        this.api_response = "Error Occured"
      }
    )
  }

}
