import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent 
{
  constructor(private authService: AuthService) {}

  // Méthode pour vérifier si l'utilisateur a le rôle de commerçant
  hasRole(role: string): boolean {
    return this.authService.getRoles(role);
  }
  
}
