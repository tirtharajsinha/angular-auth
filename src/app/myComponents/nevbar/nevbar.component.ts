import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { UserObject } from '../../user-object';
import { Emitters } from '../emitters/emitters';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-nevbar',
  templateUrl: './nevbar.component.html',
  styleUrl: './nevbar.component.css'
})
export class NevbarComponent {

  user: UserObject;

  constructor(private userService: UserService, private router: Router, private httpservice: HttpService) {
    this.loadUser();
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

  logout(): void {
    this.httpservice.logout(this.logoutCallback.bind(this))
  }


  logoutCallback() {
    this.userService.LogoutUser();
    this.router.navigate(["/"]);
  }

}
