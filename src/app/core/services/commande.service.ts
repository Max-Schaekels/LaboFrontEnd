import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeFormDTO } from '../../models/commandeFormDTO';
import { Observable } from 'rxjs';
import { CommandeDTO } from '../../models/CommandeDTO';
import { CommandeDetailDTO } from '../../models/CommandeDetailDTO';
import { CommandeProduitDTO } from '../../models/CommandeProduitDTO';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private _apiUrl = 'https://localhost:7248/api/Commande';
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  constructor() { }

  createCommande(commande: CommandeFormDTO): Observable<CommandeDTO> {
    return this.http.post<CommandeDTO>(`${this._apiUrl}/Create`, commande);
  }

  getCommandesByUtilisateur(utilisateurId: number): Observable<CommandeDTO[]> {
    return this.http.get<CommandeDTO[]>(`${this._apiUrl}/utilisateur/${utilisateurId}`);
  }
  getAllCommandes(): Observable<CommandeDTO[]> {
    return this.http.get<CommandeDTO[]>(`${this._apiUrl}`);
  }

  getCommandeById(id: number): Observable<CommandeDTO> {
    return this.http.get<CommandeDTO>(`${this._apiUrl}/${id}`);
  }

  updateStatutCommande(id: number, statut: string): Observable<void> {
    return this.http.patch<void>(`${this._apiUrl}/${id}`, { statutCommande: statut });
  }

  getCommandeDetails(id: number): Observable<CommandeDetailDTO[]> {
    return this.http.get<CommandeDetailDTO[]>(`${this._apiUrl}/${id}/details`);
  }

  getLignesCommande(id: number): Observable<CommandeProduitDTO[]> {
    return this.http.get<CommandeProduitDTO[]>(`${this._apiUrl}/commande/${id}`);
  }
}
