import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserObject } from './user-object';
import { Emitters } from './myComponents/emitters/emitters';
import { SessionService } from './session.service';
import { CookieService } from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})



export class UserService {
  user: UserObject;
  private URL: string = "http://localhost:8000/api/user";
  cookieValue: any;
  constructor(private http: HttpClient, private session: SessionService, private cookieService: CookieService) {
    this.FetchUser();
  }



  async FetchUser() {

    this.user = await this.session.currentUser();
    if (!this.user) {
      await this.LoadUserFromServer();

    }
  }

  async LoadUserFromServer() {
    await this.http.get(this.URL, {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        console.log('success', data);
        this.user = data;
        this.session.setUser(data);
        Emitters.authEmitter.emit(data);
      },
      error => {
        console.log('oops', "User is unauthenticated");
      }
    )
  }

  LogoutUser() {
    this.user = undefined;
    this.session.logoutUser();
    Emitters.authEmitter.emit(undefined);
  }

}
