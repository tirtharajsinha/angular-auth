import { Injectable } from '@angular/core';
import { UserObject } from './user-object';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  user: UserObject;
  constructor() { }

  async currentUser() {
    this.user = await JSON.parse(sessionStorage.getItem('user'));
    return this.user;
  }

  setUser(userData: UserObject) {
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  logoutUser() {
    sessionStorage.removeItem("user");
  }
}
