import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public authService: AuthService = inject(AuthService);
  private panierService : PanierService = inject(PanierService);

  readonly totalQuantite = this.panierService.totalQuantite;

  constructor() {}

  logout(): void {
    this.authService.logout();
  }
}
