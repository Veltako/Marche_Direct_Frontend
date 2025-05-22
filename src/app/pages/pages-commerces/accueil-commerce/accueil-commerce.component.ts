import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-accueil-commerce',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil-commerce.component.html',
  styleUrl: './accueil-commerce.component.css'
})
export class AccueilCommerceComponent{

  authService = inject(AuthService);
  
  ngOnInit(): void {
    const hasId = this.authService.getUserId();
    
    console.log('L\'utilisateur connecté a-t-il l\'ID', hasId);
  };
}