import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';
import { ProductFormDTO } from '../../../../models/productFormDTO';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  private _fb: FormBuilder = inject(FormBuilder);
  private _produitService: ProductService = inject(ProductService);
  private _router: Router = inject(Router);
  isSubmitting = false;
  errorMessage: string | null = null;

  productForm: FormGroup;

  


  constructor() {
    this.productForm = this._fb.group({
      nom: [null, [Validators.required, Validators.maxLength(150)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      categorie: [null, [Validators.required, Validators.maxLength(100)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      prixHTVA: [null, [Validators.required, Validators.min(0)]],
      prixTVAC: [null, [Validators.required, Validators.min(0)]]
    });

  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;

    const dto: ProductFormDTO = {
      nom: this.productForm.value.nom,
      description: this.productForm.value.description,
      categorie: this.productForm.value.categorie,
      quantite: this.productForm.value.quantite,
      prixHTVA: this.productForm.value.prixHTVA,
      prixTVAC: this.productForm.value.prixTVAC
    };

    this._produitService.create(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.productForm.reset();
        this.errorMessage = null;

        this._router.navigate(['admin/produits']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erreur lors de la création du produit :', err);
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la création du produit.';
      }
    });
  }

}
