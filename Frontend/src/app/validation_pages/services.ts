import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegistration } from '../validation_pages/validation_interface'; // Updated import
import {User} from '../validation_pages/login_interface';

@Injectable({
  providedIn: 'root' 
})
export class Services {
  
  private apiUrl = 'http://localhost:5141/api/User'; 

  constructor(private http: HttpClient) { }

  login(credentials: User){
    return this.http.post<User>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  signup(userInfo: UserRegistration): Observable<UserRegistration> { // Updated to use UserRegistration
    return this.http.post<UserRegistration>(`${this.apiUrl}/signup`, userInfo)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      // Backend returned a plain string error message
      errorMessage = error.error;
    } else if (error.error && typeof error.error === 'object' && error.error.message) {
      // Backend returned an object with a message property (e.g., { message: "..." })
      errorMessage = error.error.message;
    } else {
      // Other backend error format or unknown error
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage); // Log the detailed error to console
    return throwError(() => new Error(errorMessage));
  }
  public getCurrentUser(){
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  getbyphonenumber(phoneNumber: string){
    return this.http.get<User>(`${this.apiUrl}/${phoneNumber}`);
  }
  
}
