import { inject, Injectable } from '@angular/core';
import { PanierItem } from '../../models/panierItem';
import { Product } from '../../models/product';
import { signal } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private items: PanierItem[] = [];
  messageErreurStock: { [produitId: number]: string; } = {};
  private totalQuantiteSignal = signal<number>(0);
  readonly totalQuantite = this.totalQuantiteSignal;
  private authService: AuthService = inject(AuthService);
  private getPanierKey(): string {
    const userId = this.authService.getCurrentUser()?.id;
    return userId ? `panier_${userId}` : 'panier_invite';
  }

  constructor() { this.chargerPanier(); }

  ajouterProduit(produit: Product, quantite: number | string = 1): void {
    const qty = Number(quantite);

    const itemExistant = this.items.find(item => item.produit.id === produit.id);

    if (itemExistant) {
      itemExistant.quantite += qty;
    } else {
      const item: PanierItem = { produit, quantite: qty };
      this.items.push(item);
    }

    this.sauvegardePanier();
    this.totalQuantiteSignal.set(this.getTotalQuantite());
  }

  supprimerProduitComplet(produitId: number): void {
    this.items = this.items.filter(item => item.produit.id !== produitId);
    this.sauvegardePanier();
    this.totalQuantiteSignal.set(this.getTotalQuantite());
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
    this.totalQuantiteSignal.set(this.getTotalQuantite());
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
    this.totalQuantiteSignal.set(this.getTotalQuantite());
  }

  sauvegardePanier(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.getPanierKey(), JSON.stringify(this.items));
    }
  }

  chargerPanier(): void {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.getPanierKey());
      if (data) {
        this.items = JSON.parse(data);
      }
    }
    this.totalQuantiteSignal.set(this.getTotalQuantite());
  }


  viderPanier(): void {
    this.items = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.getPanierKey());
    }
    this.totalQuantiteSignal.set(this.getTotalQuantite());
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
