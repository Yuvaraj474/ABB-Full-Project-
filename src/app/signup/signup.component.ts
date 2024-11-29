// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[HttpClientModule, ReactiveFormsModule],
  providers:[HttpClient, AuthService, Router],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      receiveOutbidEmails: [true]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const username = `${this.signupForm.value.firstName} ${this.signupForm.value.lastName}`
      const formData = {
        username: username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.authService.signUp(formData).subscribe({
        next:(response:any) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/signupSuccess']);
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