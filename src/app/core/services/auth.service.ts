import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { RegisterFormDTO } from '../../models/RegisterFormDTO';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';
  private _apiUrl = 'https://localhost:7248/api';

  // ✅ Signals : état réactif
  private isConnectedSignal = signal<boolean>(this.hasToken());
  public readonly isConnected = this.isConnectedSignal;

  private isAdminSignal = signal<boolean>(this.hasAdminRole());
  public readonly isAdmin = this.isAdminSignal;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, mdp: string) {
    return this.http.post<{ token: string; user: User; }>(
      `${this._apiUrl}/Auth/Login`,
      { email, mdp },

    );
  }

  register(form: RegisterFormDTO) {
    return this.http.post<void>(
      `${this._apiUrl}/Auth/Register`,
      form
    );
  }

  saveAuth(token: string, user: User) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isConnectedSignal.set(true);
    this.isAdminSignal.set(user.role === 'admin');
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isConnectedSignal.set(false);
    this.isAdminSignal.set(false);
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }

  // 🔐 Méthodes internes pour état initial des signals
  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem(this.TOKEN_KEY);
  }

  private hasAdminRole(): boolean {
    if (typeof window === 'undefined') return false;

    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return false;

    try {
      const user = JSON.parse(userJson);
      return user?.role === 'admin';
    } catch {
      return false;
    }
  }
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}