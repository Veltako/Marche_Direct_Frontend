import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Produit from '../models/produit.model';
import { Observable } from 'rxjs';
import Format from '../models/format.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://127.0.0.1:8000/api/produits';
  private apiUrlFormat = 'https://127.0.0.1:8000/api/formats';

  constructor(private http: HttpClient) { }


  getFormats(): Observable<Format[]> {
    return this.http.get<Format[]>(this.apiUrlFormat);
  }

  // Créer un nouveau produit
  createProduct(product: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}`, product);
  }

  // Mettre à jour un produit existant
  updateProduct(productId: number, product: Partial<Produit>): Observable<Produit> {
    return this.http.patch<Produit>(`${this.apiUrl}/${productId}`, product);
  }

  // Supprimer un produit
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
