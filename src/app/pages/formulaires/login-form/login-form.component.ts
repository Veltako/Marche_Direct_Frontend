import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

    // Service d'authentification injecté pour les opérations de connexion
    auth = inject(AuthService); 
    // Routeur injecté pour la navigation
    router = inject(Router);
  
    submitted: boolean = false;
    message: string | null = null; //propriété pour stocker le message d'erreur.
    // Formulaire de connexion protégé par le formulaire réactif
    protected loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    // Méthode appelée à la soumission du formulaire
    onSubmit() {
        this.submitted = true;
        this.message = null; //Réinitialiser le message d'erreur.

      if (this.loginForm.valid) {
          this.auth.login(this.loginForm.value).subscribe((data: any) => {
              if (data.token) {
                  localStorage.setItem('isAuthenticated', 'true');
                  this.auth.setToken("Bearer " + data.token);
  
                  // Décodage du token pour récupérer l'ID et les rôles
                  const payload = this.auth.decodeToken();
                  const userId = payload.id; // Assurez-vous que l'ID est récupéré
  
                  if (payload.roles.includes('ROLE_ADMIN')) {
                      this.router.navigate(['admin']);
                  } else if (payload.roles.includes('ROLE_USER')) {
                      this.router.navigate(['user/profil', userId]); // Inclure l'ID dans l'URL
                  }
              } else {
                  console.error('Aucun token reçu');
                  this.message = 'Erreur lors de connexion, veuillez réessayer.'; // message d'erreur.
              }
          }, error => {
              console.error('Erreur de connexion:', error);
              this.message = 'Identifiants incorrects, veuillez vérifier votre email et votre mot de passe.'; //message d'erreur.
          });
      }
  }
  public get email()
      {
        return this.loginForm.controls["email"] //getter pour le champ email.
      }
      public get password()
      {
        return this.loginForm.controls["password"]
      }

  }
