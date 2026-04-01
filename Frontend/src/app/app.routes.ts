import { Routes } from '@angular/router';
import { LoginComponent } from './validation_pages/login/login';
import { SignupComponent } from './validation_pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path:'login',component:LoginComponent
    },
    {
        path: 'signup', component:SignupComponent
    },
    {
        path: 'dashboard' , component:Dashboard
    }
];
