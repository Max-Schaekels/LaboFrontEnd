import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PanierService } from '../../core/services/panier.service';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, FormsModule,RouterLink, RouterModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  private _productService : ProductService = inject(ProductService);
  private _http = inject(HttpClient);
  private _panierService : PanierService = inject(PanierService);
  produits: Product[] = [];
  categories: string[] = [];
  categorieActive: string | null = "";
  quantites: { [produitId: number]: number; } = {};


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

  ajouterAuPanier(produit: Product, quantite: number) {
    this._panierService.ajouterProduit(produit, quantite);
  }

  getQuantiteOptions(stock: number): number[] {
  const max = Math.min(stock, 20); // Limite visuelle à 20
  return Array.from({ length: max }, (_, i) => i + 1);
}

}
