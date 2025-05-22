import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import User from '../../models/user.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit
{  
  user !: User;
  urlImg = "https://127.0.0.1:8000/images/";
  searchForm: FormControl;
  searchResults: any[] = []; // Stocker les résultats de recherche
  userRole: string = '';
  @ViewChild('subMenu', { static:false }) subMenu!: ElementRef;

  constructor(private searchService: SearchService, private router: Router, public authService: AuthService, private route: ActivatedRoute) {
    this.searchForm = new FormControl();

    // Observateur de la saisie utilisateur
    this.searchForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term: string) => this.search(term));
  }

// Méthode pour lancer la recherche
search(term: string) {
  if (term) {
    console.log(`Recherche de : ${term}`);
    
    // Exécuter la recherche
    this.searchService.search(term).subscribe({
      next: (results) => {
        this.searchResults = [
          ...results.produits, 
          ...results.marches, 
          ...results.commercants
        ]; // Stocker les résultats
        
        // Rediriger vers la même page avec des paramètres de recherche
        this.router.navigate([], {
          queryParams: { searchTerm: term },
          queryParamsHandling: 'merge' // Ajoute le terme de recherche aux paramètres existants
        });

      },
      error: (error) => {
        console.error('Erreur lors de la recherche', error);
      }
    });
  } else {
    this.searchResults = []; // Réinitialiser les résultats si le terme est vide
  }
}

// Méthode pour naviguer vers le résultat sélectionné
navigateToResult(id: number) {
  const produit = this.searchResults.find(r => r.id === id && r.productName);
  if (produit) {
    const commercantId = produit.userProductId;
    
    const url = this.router.createUrlTree(['/marchants', commercantId]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
    return;
  }

  const marche = this.searchResults.find(r => r.id === id && r.marcheName);
  if (marche) {
    const url = this.router.createUrlTree(['/marches', marche.id]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
    return;
  }

  const commercant = this.searchResults.find(r => r.id === id && r.nameBusiness);
  if (commercant) {
    const url = this.router.createUrlTree(['/marchants', commercant.id]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
  }
}
//Méthode pour se déconnecter
public logout()
{
  this.authService.logout();
  this.router.navigate(['login']);
}
//Méthode pour savoir si un utilisateur est connecter
isLoggedIn() 
{
  return localStorage.getItem('isAuthenticated') === 'true';
}
updateHeader(url: string): void 
{
  if (url.includes('/commerce')) {
    this.userRole = 'commercant';
  }
  else if (url.includes('/admin')) {
    this.userRole = 'admin';
  } 
  else {
    this.userRole = '';
  }
}

ngOnInit(): void 
{
  this.userRole = this.authService.getUserRole();
  //Méthode pour le changement de header selon le rôle
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.updateHeader(event.url)
    }
  })
  
  const userId = this.authService.decodedToken ? this.authService.decodedToken.id : null;
  console.log(userId);
    if (userId !== null) {
      
      this.authService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;      
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
      );
    }
}
//Méthode pour le dropdown Profile
toggleMenu(): void 
{      
  if (this.subMenu) 
  {
    this.subMenu.nativeElement.classList.toggle('open-menu');
  }   
}

// Méthode pour vérifier si l'utilisateur a le rôle de commerçant
hasRole(role: string): boolean {
  return this.authService.getRoles(role);
}
}
