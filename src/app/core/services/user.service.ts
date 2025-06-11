import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from './auth.service';
import { UpdateFormDTO } from '../../models/updateFormDTO ';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = 'https://localhost:7248/api';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this._apiUrl}/User/${id}`);
  }

  update(id : number, form : UpdateFormDTO) : Observable<void>{
    return this.http.put<void>(`${this._apiUrl}/User/${id}`,form)
  }
}
