import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profil/profil.component').then(c => c.ProfilComponent)
    },
    { path: 'catalogue', component: CatalogueComponent}



];
