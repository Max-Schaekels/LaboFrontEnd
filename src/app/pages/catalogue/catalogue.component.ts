import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  private _productService = inject(ProductService);
  private _http = inject(HttpClient);
  produits: Product[] = [];
  categories: string[] = [];
  categorieActive: string | null = "";


  ngOnInit(): void {
    this._productService.getAll().subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }

    });
    this._productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
      }
    });
  }

  filtrage(): void {
    const observable = this.categorieActive === null
      ? this._productService.getAll()
      : this._productService.getByCategorie(this.categorieActive);

    observable.subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }

}
