import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { UserObject } from '../../user-object';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitters/emitters';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-nevbar',
  templateUrl: './nevbar.component.html',
  styleUrl: './nevbar.component.css'
})
export class NevbarComponent {

  user: UserObject;
  URL: string = "http://localhost:8000/api/logout";

  constructor(private http: HttpClient, private userService: UserService, private session: SessionService, private router: Router) {
    this.loadUser();
  }


  async loadUser() {
    this.user = await this.session.currentUser();
    Emitters.authEmitter.subscribe(
      (userdata: UserObject) => {
        this.user = userdata;
        // console.log(this.user);
      }
    );
  }

  logout(): void {
    this.http.post(this.URL, {}, {
      withCredentials: true
    }).subscribe(
      data => {
        console.log('success', data);
        this.userService.LogoutUser();
        this.router.navigate(["/"]);
      },
      error => {
        console.log('oops', error);
      }
    )

  }

}
