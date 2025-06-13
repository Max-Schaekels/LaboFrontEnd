export interface CommandeFormDTO {
  utilisateurId: number;
  lignes: LigneCommandeFormDTO[];
}

export interface LigneCommandeFormDTO {
  produitId: number;
  quantite: number;
}