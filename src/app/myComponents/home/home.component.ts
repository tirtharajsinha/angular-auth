import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { UserObject } from '../../user-object';
import { Emitters } from '../emitters/emitters';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  URL: string = "http://localhost:8000/api/user";
  message: string = ""
  user: UserObject;


  constructor(private http: HttpClient, private userService: UserService, private session: SessionService) {
    this.loadUser();
  }

  ngOnInit(): void {

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
