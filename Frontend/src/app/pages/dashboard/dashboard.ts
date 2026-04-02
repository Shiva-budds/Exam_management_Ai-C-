import { Component, signal } from '@angular/core';
import { Services } from '../../validation_pages/services';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  searchedTeacher_name = signal<string | null>(null);
  searchedTeacher_phonenumber = signal<string | null>(null);

  currentUser: any;
  searchQuery: string = 'er';
  constructor(private services: Services){}
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
        if(user?.Role == "Teacher" || (user as any)?.role == "Teacher"){
            this.searchedTeacher_name.set(user?.FullName || (user as any)?.fullName);// Adjusted to handle potential case-sensitivity in the response
            this.searchedTeacher_phonenumber.set(user?.PhoneNumber || (user as any)?.phoneNumber);
            console.log(this.searchedTeacher_name());
            console.log(this.searchedTeacher_phonenumber());
        }else{
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
  Teacher_Request(){
    console.log("Request sent to teacher with phone number: " + this.searchedTeacher_phonenumber());
  }
}
