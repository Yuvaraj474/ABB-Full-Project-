// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[HttpClientModule, ReactiveFormsModule, RouterModule],
  providers:[HttpClient, AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      keepSignedIn: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = `${this.loginForm.value.firstName} ${this.loginForm.value.lastName}`
      const formData = {
        username: username,
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(formData).subscribe({
        next:(response:any) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/homepage']);
        },
        error:(error:any) => {
          console.error('Error occurred:', error);
        }
    });
    } else {
      console.log('Form is invalid');
    }
  }
}