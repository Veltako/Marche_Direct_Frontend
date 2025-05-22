import { Component, OnInit } from '@angular/core';
import Produit from '../../models/produit.model';
import { ProduitsService } from '../../services/produits.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-marchant',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './marchant.component.html',
  styleUrl: './marchant.component.css'
})
export class MarchantComponent implements OnInit {

    // User
    user!: User;
    // Tableau pour stocker les produits de la page actuelle
    produits!: Produit[];
    // URL de base pour les images
    urlImg = "https://127.0.0.1:8000/images/";
    // Tableau pour stocker le panier
    cartItems: any[] = [];
    // search
    selectedProductId: number | null = null; // pour stocker l'ID du produit sélectionné
  
    // Quantité sélectionnée pour gérer le prix dans la modal
    selectedQuantity: number = 1;
  
    // Injection du service ProduitsService pour communiquer avec l'API backend
    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}
  
    // Supprimer les balises HTML de la description
    removeDivTags(text: string): string {
      return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
    }
  
    // Fonction pour multiplier le prix en fonction de la quantité sélectionnée
    changePrice(event: any) {
      const target = event.target as HTMLSelectElement;
      if (target !== null) {
        this.selectedQuantity = Number(target.value);
      }
    }
  
    // Fonction pour ajouter un produit au panier
    addToCart(item: Produit) {
      const cartItem = {
        id: item.id,
        quantity: this.selectedQuantity,
        price: item.prix,
        imageFileName: item.imageFileName,
        productName: item.productName,
        commercant: item.userProduct.id
      };
  
      // Récupérer le panier existant depuis le local storage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
      // Vérifier si l'article existe déjà dans le panier et mettre à jour sa quantité
      const existingItemIndex = cart.findIndex((ci: any) => ci.id === cartItem.id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        // Sinon, ajouter le nouvel article au panier
        cart.push(cartItem);
      }
  
      // Enregistrer le nouveau panier dans le local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Mettre à jour les articles du panier
      this.cartItems = cart;
    }
  
    // Mettre à jour la quantité d'un produit dans le panier
    updateCartItem(item: Produit, event: any) {
      const target = event.target as HTMLSelectElement;
      const selectedQuantity = Number(target.value);
  
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const index = cart.findIndex((ci: any) => ci.id === item.id);
      if (index !== -1) {
        cart[index].quantity = selectedQuantity;
        this.cartItems = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  
    // Fonction pour obtenir le nombre total d'articles dans le panier
    getTotalItems(): number {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      return cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }
  
    // Fonction pour obtenir le prix total des articles dans le panier
    getTotalPrice(): string {
      const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
        return sum + (item.price * item.quantity);
      }, 0);
      return totalPrice.toFixed(2) + ' €';
    }
    
    // Fonction pour vider le panier dans le local storage
    clearCart(): void {
      // Supprimer le panier dans le local storage
      localStorage.removeItem('cart');
      // Réinitialiser le tableau des articles du panier
      this.cartItems = []
    }
      
    // Fonction pour retirer un produit du panier
    removeFromCart(item: any): void {
      // Récupérer le panier existant depuis le local storage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Trouver l'index de l'article à supprimer
      const index = cart.findIndex((ci: any) => ci.id === item.id);
      
      // Vérifier si l'article existe dans le panier
      if (index !== -1) {
        // Si oui, le supprimer du panier
        cart.splice(index, 1);
      
        // Mettre à jour le tableau des articles du panier
        this.cartItems = cart;
      
        // Enregistrer le panier mis à jour dans le local storage
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
        
    // Logique d'initialisation pour le composant, charge les données initiales des produits
    ngOnInit(): void {
      // Écoutez les changements dans les paramètres de la route
      this.route.params.subscribe(params => {
        const id = params['id']; // Récupérer l'ID du commerçant depuis les paramètres
        if (id) {
          this.loadUserData(id); // Charger les données du commerçant
        }
      });

      // Récupérer l'ID du produit sélectionné depuis les paramètres de requête
      this.route.queryParams.subscribe(params => {
        this.selectedProductId = +params['selectedProductId']; // Convertir en nombre
      });
      
      // Récupérer et définir les articles du panier depuis le local storage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartItems = cart;
      
      // Faire défiler vers le produit sélectionné si disponible
      if (this.selectedProductId) {
        this.scrollToProduct(this.selectedProductId);
      }
    }

    // Méthode pour charger les données du commerçant
    private loadUserData(id: string) {
      this.userService.getUserById(Number(id)).subscribe((data) => {
        this.user = data;
      });
    }

    scrollToProduct(productId: number) {
      // Trouver l'élément correspondant au produit et faire défiler vers lui
      const productElement = document.getElementById(`produit-${productId}`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
}
