import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  produits = [
    { nom: 'Produit A', prix: 29.99, imageUrl: 'https://via.placeholder.com/200' },
    { nom: 'Produit B', prix: 49.99, imageUrl: 'https://via.placeholder.com/200' },
    { nom: 'Produit C', prix: 19.99, imageUrl: 'https://via.placeholder.com/200' }
  ];

}
