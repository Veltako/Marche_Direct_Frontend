import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import User from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;
  private imageUrlBase = 'https://localhost:8000/images';

  // Méthode pour obtenir l'URL complète de l'image
  getUserImageUrl(imageFileName: string | null | undefined): string {
    return imageFileName ? `${this.imageUrlBase}/${imageFileName}` : 'images';
  }

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; // Récupère l'ID de l'utilisateur depuis l'URL

    // Vérification token
    const token = localStorage.getItem('token');

    this.userService.getUserProfile(userId).subscribe(
        (data: User) => {
            this.user = data;
        },
        (error) => {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
    );
}

}