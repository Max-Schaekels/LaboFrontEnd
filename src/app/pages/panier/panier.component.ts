import { Component, inject, OnInit } from '@angular/core';
import { PanierService } from '../../core/services/panier.service';
import { PanierItem } from '../../models/panierItem';
import { CommandeService } from '../../core/services/commande.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-panier',
  imports: [CommonModule,RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {

  private panierService: PanierService = inject(PanierService);
  private commandeService: CommandeService = inject(CommandeService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastService : ToastService = inject(ToastService);

  // Liste des produits du panier
  items: PanierItem[] = [];

  // Totaux
  totalHTVA: number = 0;
  totalTVAC: number = 0;
  totalQuantite: number = 0;

  // Messages d'erreur par produit (stock)
  messageErreurStock: { [produitId: number]: string; } = {};

  readonly isConnected = this.authService.isConnected;

  constructor() { }

  ngOnInit(): void {
    this.chargerPanier();
    
  }

  // Charge les données du service
  chargerPanier(): void {
    this.items = this.panierService.getItems();
    this.totalHTVA = this.panierService.getTotalHTVA();
    this.totalTVAC = this.panierService.getTotalTVAC();
    this.totalQuantite = this.panierService.getTotalQuantite();
    this.messageErreurStock = this.panierService.messageErreurStock;
  }

  // Méthodes appelées depuis le HTML
  augmenter(produitId: number): void {
    this.panierService.augmenterQuantiter(produitId);
    this.chargerPanier();
  }

  diminuer(produitId: number): void {
    this.panierService.diminuerQuantite(produitId);
    this.chargerPanier();
  }

  supprimer(produitId: number): void {
    this.panierService.supprimerProduitComplet(produitId);
    this.chargerPanier();
  }

  vider(): void {
    this.panierService.viderPanier();
    this.chargerPanier();
  }

  passerCommande(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      console.error("Aucun utilisateur connecté.");
      return;
    }

    const commande = {
      utilisateurId: user.id,
      lignes: this.items.map(item => ({
        produitId: item.produit.id,
        quantite: item.quantite
      }))
    };
    console.log(commande);
    

    this.commandeService.createCommande(commande).subscribe({
      next: (result) => {
        this.panierService.viderPanier();
        this.chargerPanier();
        // Redirection ou confirmation
        
        this.router.navigate(['/account']);
        this.toastService.showToast('Commande crée avec succès.') 

      },
      error: (error) => {
        console.error("Erreur lors de la commande :", error);
        alert("Erreur lors de la commande. Veuillez réessayer.");
      }
    });
  }

}


