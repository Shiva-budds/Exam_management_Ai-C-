import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegistration } from '../validation_pages/validation_interface'; // Updated import
import {User} from '../validation_pages/login_interface';
import { Student_User } from '../validation_pages/validation_interface';
import { BehaviorSubject } from 'rxjs';
export interface TeacherReaquest {
  userid:number;
  teacherid:number;
}

@Injectable({
  providedIn: 'root' 
})

export class Services {
  
  private apiUrl = 'http://localhost:5141/api/User'; 
  private student_teacherapiurl = "http://localhost:5141/api/StudentTeacher";

  constructor(private http: HttpClient) { }

  login(credentials: User){
    return this.http.post<User>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  signup(userInfo: UserRegistration): Observable<UserRegistration> { 
    return this.http.post<UserRegistration>(`${this.apiUrl}/signup`, userInfo)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      
      errorMessage = error.error;
    } else if (error.error && typeof error.error === 'object' && error.error.message) {
      // Backend returned an object with a message property (e.g., { message: "..." })
      errorMessage = error.error.message;
    } else {
      // Other backend error format or unknown error
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(() => new Error(errorMessage));
  }
  public getCurrentUser(){
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  getbyphonenumber(phoneNumber: string){
    return this.http.get<User>(`${this.apiUrl}/${phoneNumber}`);
  }
  sent_teacherrequest(credentials:Student_User){
    return this.http.post<Student_User>(`${this.student_teacherapiurl}/teacherrequest`, credentials)
  }



  isLoggedIn():boolean{
    return localStorage.getItem('currentUser') !==null;

  }
  private loggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem('currentUser') !== null  // reads existing session on app start
  );

  isLoggedIn$ = this.loggedIn.asObservable();
  logout(){
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);//hiii another for the logout
  }
  slogin(userData: any) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.loggedIn.next(true); // notify nav instantly
  }
  
}
