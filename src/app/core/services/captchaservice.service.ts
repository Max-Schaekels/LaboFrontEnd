import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptchaserviceService {
  readonly PUBLIC_KEY : string = "6LfPHGUrAAAAABwQghWRcXkCrf4uLYG3_AH2r9ZF";
  private readonly _httpClient : HttpClient = inject(HttpClient);
  private _apiUrl = 'https://localhost:7248/api';

  verifyCaptcha(token : string): Observable<void>{
    return this._httpClient.post<void>(`${this._apiUrl}/Captcha/verify`, {token});
  }
  
}
