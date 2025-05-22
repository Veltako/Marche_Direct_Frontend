import { Component, AfterViewInit } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marches',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './marches.component.html',
  styleUrl: './marches.component.css'
})
export class MarchesComponent implements AfterViewInit {
  // Tableau pour stocker la liste des 'marches'
  marches!: Marche[];
  // Index de la page actuelle, initialisé à 1
  i = 1;
  // URL de base pour les images
  urlImg = "https://127.0.0.1:8000/images/";
  // Références aux boutons de pagination 'précédent' et 'suivant'
  btnPrecedent!: HTMLElement | null;
  btnSuivant!: HTMLElement | null;

  // Injection du MarchesService pour communiquer avec l'API backend
  constructor(private marchesServices: MarchesService) {}

  // Appelé après l'initialisation de la vue
  ngAfterViewInit(): void {
    // Obtenir des références aux boutons de pagination
    this.btnPrecedent = document.getElementById("btn-precedent");
    this.btnSuivant = document.getElementById("btn-suivant");
    // Mettre à jour la visibilité des boutons en fonction de la page actuelle
    this.updateButtonVisibility();
  }

  // Récupérer la page précédente des 'marches'
  public getOtherPagesMoins(): void {
    if (this.i > 1) { // S'assurer de ne pas être à la première page
      this.i = this.i - 1; // Décrémenter l'index de la page
      this.marchesServices.getOtherPages(this.i).subscribe((data) => {
        // Mettre à jour les données des 'marches' et rafraîchir la visibilité des boutons
        this.marches = data;
        this.updateButtonVisibility();
      });
    }
  }
  
  // Récupérer la page suivante des 'marches'
  public getOtherPagesPlus(): void {
    this.marchesServices.getOtherPages(this.i + 1).subscribe((data) => {
      if (data && data.length > 0) { // S'assurer que des données existent
        this.i = this.i + 1; // Incrémenter l'index de la page
        this.marches = data;
        this.updateButtonVisibility();
      }
    });
  }
  
  // Logique d'initialisation pour le composant, charge les données initiales des 'marches'
  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((data) => {
      // Définir les données initiales des 'marches'
      this.marches = data;
      // Mettre à jour la visibilité des boutons en fonction des données initiales
      this.updateButtonVisibility();
    });
  }

  // Ajuster la visibilité des boutons de pagination en fonction de la page actuelle
  private updateButtonVisibility(): void {
    if (this.btnPrecedent) {
      // Masquer le bouton précédent sur la première page
      this.btnPrecedent!.style.display = this.i === 1 ? "none" : "block";
    }

    if (this.btnSuivant) {
      // Déterminer la visibilité du bouton suivant en vérifiant si les données de la page suivante existent
      this.marchesServices.getOtherPages(this.i + 1).subscribe((data) => {
        this.btnSuivant!.style.display = data && data.length > 0 ? "block" : "none";
      });
    }
  }
}