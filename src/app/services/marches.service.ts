import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Marche from '../models/marche.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MarchesService {
  private urlApi = "https://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }

  getMarches(): Observable<Marche[]> {
    return this.http.get<Marche[]>(`${this.urlApi}/marches?itemsPerPage=6`)
  }

  getMarche(id: number): Observable<Marche> {
    return this.http.get<Marche>(`${this.urlApi}/marches/${id}`)
  }

  getMarchesAccueil():Observable<Marche[]>
  {
    return this.http.get<Marche[]>(`${this.urlApi}/marches?itemsPerPage=3`)
  }
  // Méthode pour récupérer les autres pages des marchés
  getOtherPages(i: number): Observable<Marche[]> {
    return this.http.get<Marche[]>(`${this.urlApi}/marches?itemsPerPage=6&page=${i}`);
  }
}
