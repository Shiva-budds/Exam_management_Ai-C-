import { Component, signal } from '@angular/core';
import { Services, TeacherReaquest } from '../../validation_pages/services';
import { SignalNode } from '@angular/core/primitives/signals';
import { Student_User } from '../../validation_pages/validation_interface';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  data: any = "";
  searchedTeacher_name = signal<string | null>(null);
  searchedTeacher_phonenumber = signal<string | null>(null);
  searchedTeacher_id = signal<number | null>(null);
  currentUser: any;
  searchQuery: string = 'er';
  constructor(private services: Services) { }
  ngOnInit(): void {
    this.currentUser = this.services.getCurrentUser();
  }
  // TypeScript Code to be added later:
  onSearch(query: string) {
    this.searchQuery = query;
    this.services.getbyphonenumber(query).subscribe({
      next: (user) => {
        // The issue was likely case-sensitivity. Your interface 'User' uses 'FullName' (PascalCase).
        // If the backend returns JSON with lowercase keys (default in .NET Core), 
        // user.FullName would be undefined while user['fullName'] would work.
        if (user?.Role == "Teacher" || (user as any)?.role == "Teacher") {
          this.searchedTeacher_name.set(user?.FullName || (user as any)?.fullName);// Adjusted to handle potential case-sensitivity in the response
          this.searchedTeacher_phonenumber.set(user?.PhoneNumber || (user as any)?.phoneNumber);
          this.searchedTeacher_id.set(user?.Id || (user as any)?.id);
          console.log(this.searchedTeacher_name());
          console.log(this.searchedTeacher_phonenumber());
        } else {
          this.searchedTeacher_name.set(null);
          this.searchedTeacher_phonenumber.set(null);
        }
      },
      error: (error) => {
        console.error(`Error fetching user by phone number: ${error.message}`);
      }
    })
    // Logic to filter teachers based on name or phone
  }

  Teacher_Request(id: number) {
    console.log(id)
    console.log(this.searchedTeacher_id())
    let credentials: Student_User = {
      StudentId: id,
      TeacherId: this.searchedTeacher_id() || 0,
      Status: "Pending",
      CreatedAt: new Date().toISOString()
    };
    this.services.sent_teacherrequest(credentials).subscribe({
      next: (user) => {
        console.log("succesfully added")
      }
      ,
      error: (error) => {
        console.log(error)
      }



    })
  }


}
