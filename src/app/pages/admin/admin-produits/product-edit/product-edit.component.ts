import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../models/product';
import { UpdateFormDTO } from '../../../../models/updateFormDTO ';
import { UpdateProductFormDTO } from '../../../../models/updateProductFormDTO';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private _fb: FormBuilder = inject(FormBuilder);
  private _produitService: ProductService = inject(ProductService);
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _toastService : ToastService = inject(ToastService);

  isEditing: boolean = false;
  productId?: number;
  product?: Product;
  errorMessage: string | null = null;


  editForm: FormGroup;


  constructor() {
    this.editForm = this._fb.group({
      nom: [null, [Validators.required, Validators.maxLength(150)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      categorie: [null, [Validators.required, Validators.maxLength(100)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      prixHTVA: [null, [Validators.required, Validators.min(0)]],
      prixTVAC: [null, [Validators.required, Validators.min(0)]]
    });

  }

  chargerProduit(id: number) {
    this._produitService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.editForm.patchValue(this.product);

      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit :', err);
        this.errorMessage = err.error?.message || 'Une erreur lors du chargement du produit.';
      }
    });

  }


  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = Number(id);
      this.chargerProduit(this.productId);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.productId) {
      this.errorMessage = "Formulaire invalide ou ID de produit manquant.";
      return;
    }

    this.isEditing = true;
    this.errorMessage = null;

    const dto: UpdateProductFormDTO = {
      nom: this.editForm.value.nom,
      description: this.editForm.value.description,
      categorie: this.editForm.value.categorie,
      quantite: this.editForm.value.quantite,
      prixHTVA: this.editForm.value.prixHTVA,
      prixTVAC: this.editForm.value.prixTVAC
    };

    this._produitService.update(this.productId, dto).subscribe({
      next: () => {
        this.isEditing = false;
        this.editForm.reset();
        this.errorMessage = null;

        this._router.navigate(['admin/produits']);
        this._toastService.showToast('Produit modifié avec succès')
      },
      error: (err) => {
        this.isEditing = false;
        console.error('Erreur lors de la modification du produit :', err);
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la mise à jour du produit.';
      }
    });
  }

}
