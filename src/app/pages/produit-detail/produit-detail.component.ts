import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './produit-detail.component.html',
  styleUrl: './produit-detail.component.scss'
})
export class ProduitDetailComponent implements OnInit {
  private _productService = inject(ProductService);
  private router = inject(Router);
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  id! : number;
  produit : Product | undefined;
  
  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this._productService.getById(this.id).subscribe({
      next: (data) =>{
        this.produit = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit', err)
        this.router.navigateByUrl('/catalogue');
      }
    });
  }
}
