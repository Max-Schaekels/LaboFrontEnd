import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductFormDTO } from '../../models/productFormDTO';
import { UpdateProductFormDTO } from '../../models/updateProductFormDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _apiUrl = 'https://localhost:7248/api/Produit';

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this._apiUrl);
  }

  getById(id : number) : Observable<Product>{
    return this.http.get<Product>(`${this._apiUrl}/${id}`);
  }

  getByCategorie(categorie : string) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this._apiUrl}/categorie/${categorie}`);
  }
  // create()
  create(form : ProductFormDTO) : Observable<Product>{
    return this.http.post<Product>(`${this._apiUrl}/Create`, form);
  }
  // update()
  update(id : number, form : UpdateProductFormDTO) : Observable<void>{
    return this.http.put<void>(`${this._apiUrl}/${id}`, form);
  }
  // delete()
  delete(id : number) : Observable<void>{
    return this.http.delete<void>(`${this._apiUrl}/${id}`);
  }

  //GetCategories
  getCategories() : Observable<string[]>{
    return this.http.get<string[]>(`${this._apiUrl}/categories`);
  }
}
