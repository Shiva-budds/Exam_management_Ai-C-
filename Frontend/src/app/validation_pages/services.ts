import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { user } from '../validation_pages/validation_interface';

@Injectable({
  providedIn: 'root'
})
export class Services {
  
  private apiUrl = 'http://localhost:5141/api/User'; 

  constructor(private http: HttpClient) { }

  login(credentials: user): Observable<user> {
    return this.http.post<user>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  signup(userInfo: user): Observable<user> {
    return this.http.post<user>(`${this.apiUrl}/signup`, userInfo)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    
    return throwError(() => new Error(error.error || 'Something bad happened; please try again later.'));
  }
}
