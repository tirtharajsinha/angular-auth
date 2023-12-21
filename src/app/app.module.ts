import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NevbarComponent } from './myComponents/nevbar/nevbar.component';
import { HomeComponent } from './myComponents/home/home.component';
import { LoginComponent } from './myComponents/login/login.component';
import { RegisterComponent } from './myComponents/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { CookieModule, CookieService } from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent,
    NevbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CookieModule.withOptions()
  ],
  providers: [UserService, SessionService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
