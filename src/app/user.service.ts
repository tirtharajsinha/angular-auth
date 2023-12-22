import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserObject } from './user-object';
import { Emitters } from './myComponents/emitters/emitters';
import { SessionService } from './session.service';
import { CookieService } from 'ngx-cookie';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})



export class UserService {
  user: UserObject;
  private URL: string = "http://localhost:8000/api/user";
  cookieValue: any;
  constructor(private httpservice: HttpService, private session: SessionService, private cookieService: CookieService) {
    this.FetchUser();
  }



  async FetchUser() {

    this.user = await this.session.currentUser();
    if (!this.user) {
      this.LoadUserFromServer();
    }
  }

  async LoadUserFromServer() {
    await this.httpservice.getUser(this.LoadUserFromServerCallback.bind(this));
  }

  async LoadUserFromServerCallback(data) {
    console.log('success', data);
    this.user = data;
    this.session.setUser(data);
    Emitters.authEmitter.emit(data);
  }




  LogoutUser() {
    this.user = undefined;
    this.session.logoutUser();
    Emitters.authEmitter.emit(undefined);
  }

  currentUser() {
    return this.session.currentUser();
  }

}
