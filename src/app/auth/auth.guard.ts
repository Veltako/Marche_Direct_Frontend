import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard = (requiredRole: string) => {

  // Vérifie si l'utilisateur est connecté en utilisant le service AuthService
  const isLoggedIn = inject(AuthService).isLoggedIn()

  // Injection du service Router pour la navigation
  const router = inject(Router)
  const authService = inject(AuthService);

  // Vérifie si l'utilisateur possède le rôle requis
  const hasRequiredRole = authService.getRoles(requiredRole);
  // Si l'utilisateur est connecté et possède le rôle "ROLE_ADMIN"
  if (isLoggedIn && hasRequiredRole) {
    return true; // Accès autorisé
  } else {
    // Si l'utilisateur n'est pas connecté et ne possède pas le rôle requis, redirection vers la page de connexion
    router.navigateByUrl('/interdit');
    return false; // Accès refusé
  }
};
