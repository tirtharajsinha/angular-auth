import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './myComponents/home/home.component';
import { LoginComponent } from './myComponents/login/login.component';
import { RegisterComponent } from './myComponents/register/register.component';

const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
