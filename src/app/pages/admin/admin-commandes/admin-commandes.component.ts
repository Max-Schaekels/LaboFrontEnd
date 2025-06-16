import { Component, inject, OnInit } from '@angular/core';
import { CommandeService } from '../../../core/services/commande.service';
import { CommonModule } from '@angular/common';
import { CommandeDTO } from '../../../models/CommandeDTO';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { EuropeanDatePipe } from '../../../shared/pipes/european-date.pipe';


@Component({
  selector: 'app-admin-commandes',
  imports: [CommonModule, EuropeanDatePipe],
  templateUrl: './admin-commandes.component.html',
  styleUrl: './admin-commandes.component.scss'
})
export class AdminCommandesComponent implements OnInit {
  private _commandeService: CommandeService = inject(CommandeService);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _route : ActivatedRoute = inject(ActivatedRoute);
  private _toastService : ToastService = inject(ToastService);
  commandes: CommandeDTO[] = [];

  isLoading = true;
  errorMessage: string | null = null;

  chargerCommandes() :  void {
        this._commandeService.getAllCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.isLoading = false; 
        console.log('les commandes :', this.commandes);
      },
      error: (err) => {
        this.errorMessage = "Impossible de charger les commandes.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }


  ngOnInit(): void {
    this.chargerCommandes();
  }

  changerStatut(id : number, nouveauStatut :string): void{
    this._commandeService.updateStatutCommande(id, nouveauStatut).subscribe({
      next: () => {
        this.chargerCommandes();
        this._toastService.showToast('Statut mis à jour avec succès');
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de la mise à jour du statut de la commande.";
        console.error(err);
      }
    })
  }

  detailsCommande(id : number) {
    
  }

}
