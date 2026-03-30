import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';          // ← from @angular/common
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [CommonModule, ReactiveFormsModule]   // ← ONLY these two, no Router or Services
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Services,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // You might want a dropdown for this
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.successMessage = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && typeof err.error === 'string' && err.error.includes('Allready Exists')) {
            this.errorMessage = 'This phone number is already registered.';
        } else {
            this.errorMessage = 'An unexpected error occurred during signup. Please try again.';
        }
        console.error('Signup failed', err);
      }
    });
  }
}
