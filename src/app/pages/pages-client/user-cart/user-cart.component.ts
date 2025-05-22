import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CommandeService } from '../../../services/commande.service';
import User from '../../../models/user.model';
import { Observable } from 'rxjs';
import Commande from '../../../models/command.model';
import ProduitCommande from '../../../models/produitCommande.mode';
import { ProduitsService } from '../../../services/produits.service';
import Marche from '../../../models/marche.model';
import { FormsModule } from '@angular/forms';
import Jours from '../../../models/jours.models';

// Déclaration du composant UserCart
@Component({
  selector: 'app-user-cart', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule, RouterLink, FormsModule], // Modules importés
  templateUrl: './user-cart.component.html', // Chemin vers le template HTML
  styleUrls: ['./user-cart.component.css'] // Chemin vers les styles CSS
})
export class UserCartComponent implements OnInit {
  cartItems: any[] = []; // Liste des articles dans le panier
  commercants: User[] = []; // Liste des commerçants
  urlImg = "https://127.0.0.1:8000/images/"; // URL de base pour les images
  message: string = ''; // Message à afficher pour l'utilisateur
  messageType: 'success' | 'error' = 'success'; // Type de message (succès ou erreur)
  commercantMarches: { [key: string]: Marche[] } = {};  // Stocker les marchés par commerçant
  selectedMarkets: { [key: string]: number | null } = {}; // Stocker les IDs des marchés sélectionnés par commerçant
  selectedDay: { [key: string]: string | null } = {}; // Stocker les IDs des jours sélectionnés par commerçant

  constructor(
    private userService: UserService, // Service pour les utilisateurs
    private authService: AuthService, // Service pour l'authentification
    private router: Router, // Service pour la navigation
    private commandeService: CommandeService, // Service pour les commandes
    private productService: ProduitsService // Service pour les produits
  ) { }

  // Récupère les articles du panier stockés dans le localStorage
  getCartItems(): any[] {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart;
  }

  // Calcule le nombre total d'articles dans le panier
  getTotalItems(): number {
    const cart = this.getCartItems(); // Récupère les articles du panier
    return cart.reduce((sum: number, item: any) => sum + item.quantity, 0); // Somme les quantités
  }

  // Calcule le prix total des articles dans le panier
  getTotalPrice(): string {
    const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity); // Prix total = somme des prix multipliés par les quantités
    }, 0);
    return totalPrice.toFixed(2) + ' €'; // Retourne le prix formaté avec deux décimales
  }

  // Vide le panier en supprimant les articles du localStorage
  clearCart(): void {
    localStorage.removeItem('cart'); // Supprime le panier du localStorage
    this.cartItems = []; // Réinitialise la liste des articles du panier
  }

  // Méthode pour obtenir les jours d'un marché sélectionné
  getSelectedMarketDays(commercantId: string): Jours[] | undefined {
    const marketId = Number(this.selectedMarkets[commercantId]);  // Conversion en nombre
    if (!this.commercantMarches[commercantId]) {
      console.error(`Aucun marché trouvé pour le commerçant ID ${commercantId}`);
      return undefined;
    }
    const selectedMarket = this.commercantMarches[commercantId].find(
      (marche) => marche.id === marketId
    );
    return selectedMarket ? selectedMarket.days : undefined;
  }

  // Supprime un article spécifique du panier
  removeFromCart(item: any): void {
    const cart = this.getCartItems(); // Récupère les articles du panier
    const index = cart.findIndex((ci: any) => ci.id === item.id); // Trouve l'index de l'article à supprimer
    if (index !== -1) {
      cart.splice(index, 1); // Supprime l'article du panier
      this.cartItems = cart; // Met à jour la liste des articles du panier
      localStorage.setItem('cart', JSON.stringify(cart)); // Enregistre le panier mis à jour
    }
  }

  // Met à jour la quantité d'un article dans le panier
  updateCartItem(item: any, event: any): void {
    const selectedQuantity = Number((event.target as HTMLSelectElement).value);
    const cart = this.getCartItems();
    const index = cart.findIndex(ci => ci.id === item.id);
    if (index !== -1) {
      cart[index].quantity = selectedQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItems = [...cart]; // Met à jour l'affichage du panier
    }
  }


  // Calcule le prix total d'un commerçant spécifique
  getTotalPriceByMerchant(commercantId: string): string {
    const items = this.cartItems.filter(item => item.commercant === commercantId); // Filtre les articles par commerçant
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0); // Calcule le prix total
    return totalPrice.toFixed(2) + ' €'; // Retourne le prix formaté
  }

  // Calcule le nombre total d'articles d'un commerçant spécifique
  getTotalItemByMerchant(commercantId: string): string {
    const items = this.cartItems.filter(item => item.commercant === commercantId); // Filtre les articles par commerçant
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0); // Calcule le nombre total d'articles
    return totalItems.toString(); // Retourne le total sous forme de chaîne
  }

  // Récupère les commerçants uniques présents dans le panier
  getUniqueCommercants(): void {
    const cart = this.getCartItems();
    const commercantIds = new Set<number>();

    cart.forEach((cartItem: any) => {
      commercantIds.add(cartItem.commercant);
    });

    this.commercants = [];
    commercantIds.forEach((id) => {
      this.fetchCommercantInfo(id).subscribe((info) => {
        this.commercants.push(info);
        // Récupération des marchés du commerçant
        this.userService.getMarketsByCommercant(id).subscribe((marches) => {
          this.commercantMarches[id] = marches;  // Associe les marchés au commerçant
        });
      });
    });
  }

  // Récupère les informations d'un commerçant par son ID
  fetchCommercantInfo(commercantId: number): Observable<User> {
    return this.userService.getUserProfile(commercantId); // Appel au service utilisateur
  }

  // Méthode pour gérer la sélection du jour pour un commerçant spécifique et un marché
  onDaySelect(commercantId: string, selectedDay: string | null): void {
    this.selectedDay[commercantId] = selectedDay;
  }

  // Méthode pour gérer la sélection du marché pour un commerçant spécifique
  onMarketSelect(commercantId: string, marketId: number | null): void {
    this.selectedMarkets[commercantId] = marketId;
    this.selectedDay[commercantId] = null; // Réinitialise le jour sélectionné lorsque le marché change
  }


  // Crée une nouvelle commande à partir des articles du panier
  newCommande(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }


    const userId = this.authService.getUserId();
    if (!userId) return;

    const cart = this.getCartItems();
    const groupedItems = this.groupItemsByMerchant(cart);
    const totalOrders = Object.keys(groupedItems).length;
    let successfulOrders = 0;

    for (const [merchantId, items] of Object.entries(groupedItems)) {
      const selectedMarketId = Number(this.selectedMarkets[merchantId]);
      const selectedMarket = this.commercantMarches[merchantId]?.find(
        marche => marche.id === selectedMarketId
      );


      if (!selectedMarket) {
        this.message = `Veuillez sélectionner un marché pour le commerçant ${merchantId}.`;
        return;
      }
      if (!this.selectedDay[merchantId]) {
        this.message = `Veuillez sélectionner une journée pour le commerçant ${merchantId}.`;
        return;
      }
      // Vérifiez que le stock est suffisant avant de créer la commande
      const insufficientStock = items.some(item => item.stock < item.quantity);
      if (insufficientStock) {
        this.message = 'Quantité demandée supérieure au stock disponible.';
        return; // Sortir si le stock est insuffisant
      }

      // Récupération des infos commerçant et client pour la commande
      this.fetchCommercantInfo(+merchantId).subscribe(merchantInfo => {
        this.userService.getUserProfile(userId).subscribe(userInfo => {
          const produits_commande: ProduitCommande[] = items.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }));

          const produits = items.map(item => ({
            id: item.id,
            productName: item.name,
            description: item.description,
            prix: item.price,
            stock: item.stock ?? 0,
            imageFileName: item.imageFileName,
            userProduct: item.user,
            format: item.format
          }));

          const UserCommande = [userInfo, merchantInfo];
          const selectedDay = this.selectedDay[merchantId] || "";

          const orderData: Commande = {
            produits_commande: produits_commande,
            etat: { id: 1, name: 'En attente' },
            UserCommande: UserCommande,
            produits: produits,
            marche: selectedMarket,
            jour: selectedDay,
          };

          // Création de la commande et mise à jour du stock
          this.createOrder(orderData).subscribe(
            response => {
              successfulOrders++;
              this.message = 'Commande créée avec succès !';
              // Mettez à jour le stock
              let updateStockPromises = items.map(item => {
                const stock = item.stock !== undefined ? item.stock : 0; // Valeur par défaut si undefined
                const quantity = item.quantity !== undefined ? item.quantity : 0; // Valeur par défaut si undefined

                // Ajoutez des logs pour vérifier les valeurs
                console.log(`Product ID: ${item.id}, Stock: ${stock}, Quantity requested: ${quantity}`);

                // Vérifiez si la quantité demandée est supérieure au stock
                if (quantity > stock) {
                  this.message = `Quantité demandée pour ${item.productName} dépasse le stock disponible. Stock actuel: ${stock}.`;
                  console.error(`Quantity requested exceeds available stock for product ID: ${item.id}.`);
                  return Promise.reject(new Error(`Quantity requested exceeds available stock for product ID: ${item.id}.`));
                }

                const newStock = stock - quantity; // Calculer le nouveau stock
                console.log(`Updating stock for product ID: ${item.id}, New stock: ${newStock}`); // Log pour déboguer
                return this.productService.updateProductStock(item.id, newStock).toPromise();
              });


              Promise.all(updateStockPromises).then(() => {
                // Tout a réussi, videz le panier ici
                if (successfulOrders === totalOrders) {
                  this.clearCart();
                }
              }).catch(error => {
                this.message = 'Erreur lors de la mise à jour du stock.';
                console.error('Erreur lors de la mise à jour du stock :', error);
              });
              if (successfulOrders === totalOrders) {

                this.clearCart();
              }
            },
            error => {
              console.error("Erreur lors de la création de la commande:", error);
              this.message = 'Erreur lors de la création de la commande. Veuillez réessayer.';
            }
          );
        }, error => {
          console.error("Erreur lors de la récupération des informations du client:", error);
          this.message = 'Erreur lors de la récupération des informations du client.';
        });
      }, error => {
        console.error("Erreur lors de la récupération des informations du commerçant:", error);
        this.message = 'Erreur lors de la récupération des informations du commerçant.';
      });
    }
  }





  // Regroupe les articles par commerçant
  groupItemsByMerchant(cart: any[]): { [key: string]: any[] } {
    return cart.reduce((acc: { [key: string]: any[] }, item) => {
      if (!acc[item.commercant]) {
        acc[item.commercant] = []; // Initialise un tableau pour chaque commerçant
      }
      acc[item.commercant].push(item); // Ajoute l'article au tableau du commerçant correspondant
      return acc;
    }, {});
  }

  // Crée une commande en appelant le service de commande
  createOrder(orderData: Commande): Observable<Commande> {
    return this.commandeService.createCommande(orderData); // Appel au service de commande
  }

  // Méthode d'initialisation du composant
  ngOnInit(): void {
    const cart = this.getCartItems(); // Récupère les articles du panier
    this.cartItems = cart; // Met à jour la liste des articles dans le composant
    this.getUniqueCommercants(); // Récupère les commerçants uniques dans le panier
  }
}
