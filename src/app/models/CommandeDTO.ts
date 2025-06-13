import { LigneCommandeDTO } from "./LigneCommandeDTO";


export interface CommandeDTO {
  id: number;
  utilisateurId: number;
  date: string;
  statut: string ;
  totalHTVA: number;
  totalTVAC: number;
  lignes: LigneCommandeDTO[];
}