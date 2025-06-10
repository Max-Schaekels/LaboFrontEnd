import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path : '', component : HomeComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'login', component : LoginComponent}

    //exemple de la mise en place du guard à faire à l'avenir 
    // { path: 'account', component: AccountComponent, canActivate: [authGuard] } (authentification)
];
