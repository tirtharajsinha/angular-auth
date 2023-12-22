import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private LOGOUT_URL: string = "http://localhost:8000/api/logout";
  private LOGIN_URL: string = "http://localhost:8000/api/login";
  private REGISTER_URL: string = "http://localhost:8000/api/register";
  private USER_URL: string = "http://localhost:8000/api/user"


  constructor(private http: HttpClient) { }

  register(form, callback, errorCallback) {
    this.http.post(this.REGISTER_URL, form.getRawValue()).subscribe(
      data => {
        callback(data);
      },
      error => {
        errorCallback(error);
      }
    )
  }

  login(form, callback, errorCallback) {
    this.http.post(this.LOGIN_URL, form.getRawValue(), {
      withCredentials: true
    }).subscribe(
      data => {
        callback(data);
      },
      error => {

        errorCallback(error);
      }
    )
  }

  logout(callback): void {
    this.http.post(this.LOGOUT_URL, {}, {
      withCredentials: true
    }).subscribe(
      data => {
        callback(data);
      },
      error => {
        console.log('oops', error);
      }
    )
  }

  async getUser(callback) {
    await this.http.get(this.USER_URL, {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        callback(data);
      },
      error => {
        console.log('oops', "User is unauthenticated");
      }
    )
  }
}
