import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommandeService } from '../../../core/services/commande.service';
import { CommandeDTO } from '../../../models/CommandeDTO';
import { CommonModule } from '@angular/common';
import { EuropeanDatePipe } from '../../../shared/pipes/european-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historiquecommandes',
  imports: [CommonModule, EuropeanDatePipe],
  templateUrl: './historiquecommandes.component.html',
  styleUrl: './historiquecommandes.component.scss'
})
export class HistoriquecommandesComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private commandeService: CommandeService = inject(CommandeService);
  private router: Router = inject(Router);
  commandes: CommandeDTO[] = [];

  isLoading = true;
  errorMessage: string | null = null;


  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.commandeService.getCommandesByUtilisateur(user.id).subscribe({
        next: (data) => {
          this.commandes = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = "Impossible de charger vos commandes.";
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  voirDetails(id: number) {
    this.router.navigate(['/commande', id]);
  }
}
