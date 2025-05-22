import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../../services/produits.service';
import Produit from '../../models/produit.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Déclaration du composant Produits
@Component({
  selector: 'app-produits', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [RouterLink, CommonModule, FormsModule], // Modules importés
  templateUrl: './produits.component.html', // Chemin vers le template HTML
  styleUrls: ['./produits.component.css'] // Chemin vers les styles CSS
})
export class ProduitsComponent implements OnInit {
  // Tableau pour stocker tous les produits
  maxProduits!: Produit[];
  // Tableau pour stocker les produits de la page actuelle
  produits!: Produit[];
  // Index de la page actuelle, initialisé à 1
  i = 1;
  // URL de base pour les images des produits
  urlImg = "https://127.0.0.1:8000/images/";
  // Références aux boutons de pagination 'précédent' et 'suivant'
  btnPrecedent!: HTMLElement | null;
  btnSuivant!: HTMLElement | null;
  // Tableau pour stocker les articles du panier
  cartItems: any[] = [];
  // Quantité sélectionnée pour le produit
  selectedQuantity: number = 1;


  // Injection du service ProduitsService pour interagir avec l'API
  constructor(private produitsServices: ProduitsService) {}

  // Supprimer les balises HTML de la description
  removeDivTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' '); // Remplace les balises par des espaces
  }

  // Met à jour la quantité sélectionnée en fonction de l'événement
  changePrice(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedQuantity = Number(target.value); // Convertit la valeur sélectionnée en nombre
  }

  // Ajoute un produit au panier
  addToCart(item: Produit): void {
    // Crée un objet représentant l'article du panier
    const cartItem = {
      id: item.id,
      quantity: this.selectedQuantity,
      price: item.prix,
      stock: item.stock,
      imageFileName: item.imageFileName,
      productName: item.productName,
      commercant: item.userProduct.id // ID du commerçant
    };

    // Récupère le panier existant depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((ci: any) => ci.id === cartItem.id); // Vérifie si l'article existe déjà

    if (existingItemIndex !== -1) {
      // Si l'article existe, met à jour sa quantité
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Sinon, ajoute le nouvel article au panier
      cart.push(cartItem);
    }

    // Enregistre le panier mis à jour dans le local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart; // Met à jour le tableau des articles du panier
  }

  // Met à jour la quantité d'un produit dans le panier
  updateCartItem(item: Produit, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedQuantity = Number(target.value);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((ci: any) => ci.id === item.id);

    if (index !== -1) {
      // Met à jour la quantité dans le panier
      cart[index].quantity = selectedQuantity;
      this.cartItems = cart; // Met à jour le tableau des articles du panier
      localStorage.setItem('cart', JSON.stringify(cart)); // Enregistre le panier mis à jour
    }
  }

  // Obtient le nombre total d'articles dans le panier
  getTotalItems(): number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((sum: number, item: any) => sum + item.quantity, 0); // Somme les quantités
  }

  // Obtient le prix total des articles dans le panier
  getTotalPrice(): string {
    const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity); // Calcule le prix total
    }, 0);
    return totalPrice.toFixed(2) + ' €'; // Retourne le prix formaté
  }


  // Fonction pour vider le panier dans le local storage
  clearCart(): void {
    localStorage.removeItem('cart'); // Supprime le panier du local storage
    this.cartItems = []; // Réinitialise le tableau des articles du panier
  }

  // Retire un produit du panier
  removeFromCart(item: any): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Récupère le panier existant
    const index = cart.findIndex((ci: any) => ci.id === item.id); // Trouve l'index de l'article à supprimer

    if (index !== -1) {
      cart.splice(index, 1); // Supprime l'article du panier
      this.cartItems = cart; // Met à jour le tableau des articles du panier
      localStorage.setItem('cart', JSON.stringify(cart)); // Enregistre le panier mis à jour
    }
  }

  // Appelé après l'initialisation de la vue
  ngAfterViewInit(): void {
    this.btnPrecedent = document.getElementById("btn-precedent"); // Récupère le bouton précédent
    this.btnSuivant = document.getElementById("btn-suivant"); // Récupère le bouton suivant
    this.updateButtonVisibility(); // Met à jour la visibilité des boutons
  }

  // Récupère la page précédente des produits
  public getOtherPagesMoins(): void {
    if (this.i > 1) {
      this.i -= 1; // Décrémente l'index de la page
      this.produitsServices.getOtherPages(this.i).subscribe((data) => {
        this.produits = data; // Met à jour les produits de la page actuelle
        this.updateButtonVisibility(); // Met à jour la visibilité des boutons
      });
    }
  }

  // Récupère la page suivante des produits
  public getOtherPagesPlus(): void {
    this.produitsServices.getOtherPages(this.i + 1).subscribe((data) => {
      if (data && data.length > 0) {
        this.i += 1; // Incrémente l'index de la page
        this.produits = data; // Met à jour les produits de la page actuelle
        this.updateButtonVisibility(); // Met à jour la visibilité des boutons
      }
    });
  }

  // Logique d'initialisation pour le composant, charge les données initiales des produits
  ngOnInit(): void {
    this.produitsServices.getProduits().subscribe((data) => {
      this.produits = data; // Définit les produits de la première page
      this.updateButtonVisibility(); // Met à jour la visibilité des boutons
    });

    // Récupère et définit les articles du panier depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart; // Met à jour le tableau des articles du panier
  }

  // Ajuste la visibilité des boutons de pagination en fonction de la page actuelle
  private updateButtonVisibility(): void {
    if (this.btnPrecedent) {
      this.btnPrecedent.style.display = this.i === 1 ? "none" : "block"; // Masque le bouton précédent sur la première page
    }

    if (this.btnSuivant) {
      this.produitsServices.getOtherPages(this.i + 1).subscribe((data) => {
        this.btnSuivant!.style.display = data && data.length > 0 ? "block" : "none"; // Utilisation de l'opérateur '!'
      });
    }
  }    
}
