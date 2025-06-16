import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../core/services/commande.service';
import { CommandeDetailDTO } from '../../models/CommandeDetailDTO';
import { CommonModule } from '@angular/common';
import { CommandeDTO } from '../../models/CommandeDTO';
import { EuropeanDatePipe } from "../../shared/pipes/european-date.pipe";

@Component({
  selector: 'app-commande-detail',
  imports: [CommonModule, EuropeanDatePipe],
  templateUrl: './commande-detail.component.html',
  styleUrl: './commande-detail.component.scss'
})
export class CommandeDetailComponent implements OnInit {
  commandeId!: number;
  details: CommandeDetailDTO[] = [];
  resume: CommandeDTO | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private commandeService: CommandeService = inject(CommandeService);
  private router: Router = inject(Router);

  

  constructor() { }

  ngOnInit(): void {
    this.commandeId = Number(this.route.snapshot.paramMap.get('id'));

    this.commandeService.getCommandeDetails(this.commandeId).subscribe({
      next: (details) => {
        this.details = details;
        console.log("détails commande :",this.details);

        
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des détails.';
        this.isLoading = false;
      }
    });

    this.commandeService.getCommandeById(this.commandeId).subscribe({
      next: (commande) => {
        this.resume = commande;
        console.log("Résumé commande :", this.resume);
      },
      error: () => {
        this.errorMessage = 'Commande non trouvée.';
      }
    });
  }

  retourProfil(): void {
    this.router.navigate(['/account']);
  }
}


