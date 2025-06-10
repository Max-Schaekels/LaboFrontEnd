import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { RegisterFormDTO } from '../../models/RegisterFormDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';
  private _apiUrl = 'https://localhost:7248/api';

  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, mdp: string) {
    return this.http.post<{ token: string, user: User; }>(
      `${this._apiUrl}/Auth/Login`,
      { email: email, mdp: mdp },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  saveAuth(token: string, user: User) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isConnectedSubject.next(true);
    this.isAdminSubject.next(user.role === "admin");
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isConnectedSubject.next(false);
    this.isAdminSubject.next(false);
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

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem(this.TOKEN_KEY);
  }

  private hasAdminRole(): boolean {
    if (typeof window === 'undefined') return false;

    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return false;

    try {
      const user = JSON.parse(userJson);
      return user?.role === "admin";
    } catch {
      return false;
    }
  }

  initAuthState() {
    const isConnected = this.hasToken();
    const isAdmin = this.hasAdminRole();

    this.isConnectedSubject.next(isConnected);
    this.isAdminSubject.next(isAdmin);
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  register(form : RegisterFormDTO){
    return this.http.post(
      `${this._apiUrl}/Auth/Register`,
      { form : form },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }
}
