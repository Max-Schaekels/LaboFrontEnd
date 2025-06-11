import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  const token = authService.getToken();

  // vérifier si le token existe
  if (token) {
    // ajouter Authorization dans les headers
    const requestClone = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token),
    });

    return next(requestClone);
  }

  return next(req);
};
