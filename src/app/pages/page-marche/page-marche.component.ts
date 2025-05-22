import { Component, inject, OnInit } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-marche',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-marche.component.html',
  styleUrls: ['./page-marche.component.css'] // Corrigé "styleUrl" en "styleUrls"
})
export class PageMarcheComponent implements OnInit {
  marche!: Marche;
  urlImg = "https://127.0.0.1:8000/images/";
  
  // Injecter les services et dépendances
  marcheServices = inject(MarchesService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Méthode pour récupérer le marché par ID
  private subscribeMarche(id: number) {
    this.marcheServices.getMarche(id).subscribe((data) => {
      this.marche = data;
    });
  }

  // Méthode pour gérer l'abonnement aux paramètres de la route
  private setSubscribe(id: string | null) {
    if (id) {
      this.subscribeMarche(+id);
    }
  }

  // Méthode pour enlever les balises HTML d'un texte
  removeDivTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
  }

  ngOnInit(): void {
    // Souscrire aux changements de paramètres de la route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.setSubscribe(id);
    });
  }
}
