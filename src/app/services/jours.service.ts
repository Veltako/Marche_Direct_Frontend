import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Jours from '../models/jours.models';

@Injectable({
  providedIn: 'root'
})
export class JoursService 
{
  private urlApi = "https://127.0.0.1:8000/api"

  constructor(private http: HttpClient) { }

  getDays():Observable<Jours[]> 
  {
    return this.http.get<Jours[]>(`${this.urlApi}/days`)
  }
}
