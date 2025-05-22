import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = "https://localhost:8000"; // URL de l'API
  token = ""; // Token d'authentification
  decodedToken: any = null; // Token décodé

  constructor(private http: HttpClient) {
    // Récupère le token stocké dans le localStorage au démarrage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.setToken(storedToken);
    }
  }

  // Inscription d'un utilisateur
  signup(data: any) {
    return this.http.post(`${this.urlApi}/register`, data);
  }

  // Connexion d'un utilisateur
  login(data: any) {
    return this.http.post<{ token: string }>(`${this.urlApi}/api/login_check`, data).pipe(
      tap(response => {
        this.setToken(response.token); // Stocke le token reçu
      })
    );
  }

  // Définit et stocke le token d'authentification
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
    this.decodedToken = jwtDecode(token); // Décode le token
  }

  // Récupère le token d'authentification
  getToken() {
    return this.token;
  }

  // Déconnecte l'utilisateur
  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('authToken');
    this.token = "";
    this.decodedToken = null;
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  decodeToken(): any {
    const token = this.getToken()
    if (token) {
      return jwtDecode(token);
    }
    return null
  }

  // Méthode pour vérifier si un utilisateur possède un rôle spécifique
  getRoles(value: string): boolean {
    // Vérifie si le token décodé existe et si l'utilisateur possède le rôle spécifié
    if (this.decodedToken) {
      return this.decodedToken.roles.some((role: string) => role === value)
    }
    // Retourne false si le token décodé n'existe pas ou si l'utilisateur ne possède pas le rôle spécifié
    return false;
  }
  //Méthode pour récupérer le rôle principal
  getUserRole(): string 
  {
    const token = this.decodedToken;
    return token?.role || '';
  }

  // Nouvelle méthode pour récupérer les informations d'un utilisateur par son ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/api/users/${id}`);
  }

  getUserId(): number | null {
    if (this.decodedToken && this.decodedToken.id) {
      return this.decodedToken.id;
    }
    return null;
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.urlApi}/api/reset-password`, {
      token,
      newPassword
    });
  }
}