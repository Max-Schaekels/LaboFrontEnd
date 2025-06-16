import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProduitDetailComponent } from './pages/produit-detail/produit-detail.component';
import { PanierComponent } from './pages/panier/panier.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profil/profil.component').then(c => c.ProfilComponent)
    },
    { path: 'catalogue', component: CatalogueComponent },
    { path: 'produit/:id', component: ProduitDetailComponent },
    { path: 'panier', component: PanierComponent },
    {
        path: 'commande/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/commande-detail/commande-detail.component').then(m => m.CommandeDetailComponent)

    },
    {
        path: 'admin/produits',
        canActivate: [adminGuard], 
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/admin/admin-produits/admin-produits.component').then(m => m.AdminProduitsComponent),
            },
            {
                path: 'ajouter',
                loadComponent: () =>
                    import('./pages/admin/admin-produits/product-create/product-create.component').then(m => m.ProductCreateComponent),
            },
            {
                path: 'editer/:id',
                loadComponent: () =>
                    import('./pages/admin/admin-produits/product-edit/product-edit.component').then(m => m.ProductEditComponent),
            }
        ]
    }



];
