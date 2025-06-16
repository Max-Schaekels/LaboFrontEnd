import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-produits',
  imports: [CommonModule],
  templateUrl: './admin-produits.component.html',
  styleUrl: './admin-produits.component.scss'
})
export class AdminProduitsComponent implements OnInit {
  private _productService: ProductService = inject(ProductService);
  private _router: Router = inject(Router);
  produits: Product[] = [];
  pageSize: number = 6;
  currentPage: number = 1;

  private chargerProduits(): void {
    this._productService.getAll().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur lors du chargement des produits :', err)
    });
  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  ajouterProduit(): void {
    this._router.navigateByUrl('/admin/produits/ajouter');
  }

  editProduit(id: number): void {
    this._router.navigateByUrl(`/admin/produits/editer/${id}`);
  }

  deleteProduit(id: number): void {
    this._productService.delete(id).subscribe({
      next: () => this.chargerProduits(),
      error: (err) => {
        console.error('Erreur lors la suppresion du produit :', err);
      }
    });
  }

  get produitsPage(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.produits.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.produits.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
