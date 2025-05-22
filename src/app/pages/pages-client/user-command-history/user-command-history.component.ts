import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import Commande from '../../../models/command.model';
import User from '../../../models/user.model';
import { CommandeService } from '../../../services/commande.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-command-history',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-command-history.component.html',
  styleUrls: ['./user-command-history.component.css']
})
export class UserCommandHistoryComponent implements OnInit {
  user: User | null = null;
  commands: Commande[] = [];

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
  }
    
  
  cancelCommande(commandId: number): void {
    const commandData = { "etat": "/api/etats/5" }; // Assurez-vous que 'etat' est le champ correct selon votre modèle.
  
    // Appelez le service pour mettre à jour la commande.
    this.commandsService.updateCommande(commandId, commandData).subscribe(
      (data: Commande | null) => {
        if (data) {
          // La commande a été mise à jour avec succès.
          console.log('Commande annulée:', data);
          
          // Mettez à jour l'état de la commande dans l'interface utilisateur
          const index = this.commands.findIndex(command => command.id === commandId);
          if (index !== -1) {
            this.commands[index].etat = data.etat; // Mettez à jour l'état avec la réponse de l'API.
          }
        } else {
          // Gérer le cas où la commande n'a pas pu être annulée.
          console.error('Erreur lors de l\'annulation de la commande.');
        }
      },
      (error) => {
        // Gérer les erreurs de l'appel API ici.
        console.error('Erreur de communication avec le service:', error);
      }
    );
  }
  
}

