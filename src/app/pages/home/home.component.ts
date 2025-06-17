import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../core/services/product.service';
import { PanierService } from '../../core/services/panier.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private _productService: ProductService = inject(ProductService);
  private _panierService: PanierService = inject(PanierService);
  produits: Product[] = [];



  ngOnInit(): void {
    this._productService.getAll().subscribe({
      next: (data) => {
        this.produits = this.shuffleArray(data).slice(0, 4);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }

    });
  }

  private shuffleArray(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }

}
