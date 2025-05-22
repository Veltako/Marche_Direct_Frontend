import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Commande from '../models/command.model';
import { Observable } from 'rxjs';
import Etat from '../models/etat.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private urlApi = "https://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.urlApi}/commandes`);
  }

  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.urlApi}/commandes/${id}`);
  }

  getCommandeByUserId(userId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.urlApi}/commandes?userId=${userId}`);
  }

  // Méthode pour récupérer les autres pages des auteurs
  getOtherPages(i: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.urlApi}/produits?itemsPerPage=6&page=${i}`);
  }

  // Méthode pour créer une commande
  createCommande(data: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.urlApi}/commandes`, data);
  }

  // Méthode pour mettre à jour une commande
  updateCommande(id: number, data: any): Observable<Commande> {
    return this.http.patch<Commande>(`${this.urlApi}/commandes/${id}`, data);
  }

  getEtats(): Observable<Etat[]> {
    return this.http.get<Etat[]>(`${this.urlApi}/etats`);
  }
}
