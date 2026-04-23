import { Routes } from '@angular/router';
import { Login } from './validation_pages/login/login';
import { SignupComponent } from './validation_pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: 'home' } 
];
