import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Produit from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private urlApi = "https://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlApi}/produits`);
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.urlApi}/produits/${id}`);
  }

  // Méthode pour récupérer les autres pages des auteurs
  getOtherPages(i: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.urlApi}/produits?itemsPerPage=6&page=${i}`);
  }

  // Méthode pour update le stock d'un produit
  updateProductStock(id: number, stock: number): Observable<Produit> {
    return this.http.patch<Produit>(`${this.urlApi}/produits/${id}`, { stock } );
  }
}
