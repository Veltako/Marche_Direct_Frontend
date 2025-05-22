import { Component } from '@angular/core';
import Commande from '../../../models/command.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { AuthService } from '../../../auth/auth.service';
import User from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import Etat from '../../../models/etat.model';

@Component({
  selector: 'app-gestion-des-commandes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gestion-des-commandes.component.html',
  styleUrl: './gestion-des-commandes.component.css'
})
export class GestionDesCommandesComponent {

  user: User | null = null;
  commands: Commande[] = [];
  etats: Etat[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private commandsService: CommandeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.decodedToken?.id;
  
    if (userId) {
      // Fetch user details
      this.authService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error retrieving user information', error);
        }
      );
  
      // Fetch user commands
      this.commandsService.getCommandeByUserId(userId).subscribe(
        (data: Commande[] | null) => {
          if (data) {
            this.commands = data;
            console.log(this.commands);
            
          } else {
            console.warn("No command data found for this user.");
          }
        },
        (error) => {
          console.error('Error retrieving commands data:', error);
        }
      );
    } else {
      console.warn('User ID not available.');
    }
    
    this.commandsService.getEtats().subscribe(
      (data: Etat[] | null) => {
        if (data) {
          this.etats = data;
        } else {
          console.warn("No etat data found for this user.");
        }
      },
      (error) => {
        console.error('Error retrieving etats data:', error);
      }
    );
  }
}
