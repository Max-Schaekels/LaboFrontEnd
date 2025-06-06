import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private _apiUrl : string = "https://localhost:7248/";

  constructor(private _http : HttpClient) { }

  //Register 

}
