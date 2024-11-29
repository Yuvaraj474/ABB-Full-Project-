// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'; // Ensure you have this component
import { EndpageComponent } from './endpage/endpage.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  {path:'signupSuccess', component:EndpageComponent},// Add this route
  {path:'homepage', component:HomePageComponent},
  {path:'landingpage', component:LandingpageComponent}

];


