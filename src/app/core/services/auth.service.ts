import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';
  private _apiUrl = 'http://localhost:7248/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, mdp: string) {
    return this.http.post<{ token: string, user: User; }>(
      `${this._apiUrl}/Auth/Login`,
      { email: email, mdp: mdp }, // <-- bien formé
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  saveAuth(token: string, user: User) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
