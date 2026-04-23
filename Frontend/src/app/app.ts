import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Services } from './validation_pages/services';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
   user: any;
  constructor(private authService: Services , private router: Router){}
  ngOnInit(){
    // const user = this.authService.getCurrentUser();
    // this.user = user;
    this.authService.isLoggedIn$.subscribe(status => {
    this.user = status; // nav updates instantly
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
