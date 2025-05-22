// src/app/services/cart.service.ts 
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.cartItems);

  constructor() {}

  // Methode pour récupérer tous les produits
  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Methode pour ajouter un produit dans le panier
  addToCart(item: CartItem): void {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
  }

  // Methode pour supprimer le produit
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}
