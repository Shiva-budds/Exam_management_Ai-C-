import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../services';
import { HttpErrorResponse } from '@angular/common/http';
// ADD these two:
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',          // ← was './login.component.html'
  styleUrls: ['./login.css'],           // ← was './login.component.css'
  imports: [CommonModule, ReactiveFormsModule]   // ← ADD this
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  userNotFound = false;

  constructor(
    private fb: FormBuilder,
    private authService: Services,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming 10 digit phone number
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;    }

    const credentials = {
      phoneNumber: this.loginForm.value.phoneNumber.trim(),
      password: this.loginForm.value.password.trim(),
      fullName: '', // Required by user interface
      role: ''      // Required by user interface
    
    }

    this.errorMessage = null;
    this.userNotFound = false;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Here you would typically save the user token and navigate
        // For example: localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']); // Navigate to a protected route
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) { 
          this.errorMessage = 'User with this phone number was not found.';
          this.userNotFound = true;
        } else if (err.status === 400) {
            this.errorMessage = 'Invalid password. Please try again.';
        }
        else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        console.error('Login failed', err);
      }
    });
  }
}
