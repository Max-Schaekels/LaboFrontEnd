import { Injectable } from '@angular/core';
import { PanierItem } from '../../models/panierItem';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private items: PanierItem[] = [];
  messageErreurStock: { [produitId: number]: string; } = {};

  constructor() { this.chargerPanier(); }

  ajouterProduit(produit: Product, quantite: number = 1): void {
    // Cherche si le produit est déjà présent dans le panier
    const itemExistant = this.items.find(item => item.produit.id === produit.id);

    if (itemExistant) {
      // S’il existe, on augmente simplement la quantité
      itemExistant.quantite += quantite;
    } else {
      // Sinon on l’ajoute
      const item: PanierItem = { produit, quantite };
      this.items.push(item);
    }

    this.sauvegardePanier();
  }

  supprimerProduitComplet(produitId: number): void {
    this.items = this.items.filter(item => item.produit.id !== produitId);
    this.sauvegardePanier();
  }

  augmenterQuantiter(produitId: number): void {
    const item = this.items.find(item => item.produit.id === produitId);
    if (item) {
      if (item.quantite < item.produit.quantite) {
        item.quantite++;
        this.messageErreurStock[produitId] = "";
      }
      else {
        this.messageErreurStock[produitId] = "Stock maximum atteint pour ce produit.";
      }
    }
    this.sauvegardePanier();
  }

  diminuerQuantite(produitId: number): void {
    const item = this.items.find(i => i.produit.id === produitId);
    if (item) {
      item.quantite--;
      if (item.quantite <= 0) {
        this.items = this.items.filter(i => i.produit.id !== produitId);
      }
    }
    this.sauvegardePanier();
  }

  sauvegardePanier(): void {
    localStorage.setItem('panier', JSON.stringify(this.items));
  }

  chargerPanier(): void {
    const data = localStorage.getItem('panier');
    if (data) {
      this.items = JSON.parse(data);
    }
  }

  viderPanier(): void {
    this.items = [];
    localStorage.removeItem('panier');
  }

  getTotalHTVA(): number {
    return this.items.reduce((total, item) => total + item.produit.prixHTVA * item.quantite, 0);
  }

  getTotalTVAC(): number {
    return this.items.reduce((total, item) => total + item.produit.prixTVAC * item.quantite, 0);
  }

  getTotalQuantite(): number {
    return this.items.reduce((total, item) => total + item.quantite, 0);
  }

  getItems(): PanierItem[] {
    return this.items;
  }
}
