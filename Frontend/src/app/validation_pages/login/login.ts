import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../services';
import { HttpErrorResponse } from '@angular/common/http';
// ADD these two:
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../login_interface';




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
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // camelCase, standard for Angular form controls
      password: ['', Validators.required]                                        // camelCase, standard for Angular form controls
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    console.log("Form submitted");
    let userData: User = {
      PhoneNumber: this.loginForm.value.phoneNumber.trim(),
      Password: this.loginForm.value.password.trim(),
      FullName: '', // Default empty as per interface
      Role: ''      // Default empty as per interface
    };
    // The following check is redundant due to Validators.required and the initial this.loginForm.invalid check.
    // if(userData.PhoneNumber != "" && userData.Password != "") {
    this.authService.login(userData).subscribe({
      next: (response) => {
        // console.log('Login successful:', response);

        // Inside your login component/service after success
        // Inside your login component/service after success
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        if (error.status === 404) {
          this.userNotFound = true;
          this.errorMessage = 'User not found. Please check your phone number.';
        } else {
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
      }
    })
    // }
  }
}
