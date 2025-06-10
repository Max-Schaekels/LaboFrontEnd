import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routeur = inject(Router);

  if(authService.isAdmin()){

    return true;
  }
  return routeur.createUrlTree([''])
};
