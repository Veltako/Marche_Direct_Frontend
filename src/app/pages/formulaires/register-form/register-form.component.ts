import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
      // Service d'authentification injecté pour les opérations d'inscription
      auth = inject(AuthService); 
      // Routeur injecté pour la navigation
      router = inject(Router);
    
    
      submitted :boolean = false; // Indicateur pour soumission du formulaire
      message: boolean = false; // Indicateur pour l'affichage d'un message
    
      // Formulaire d'inscription protégé par le formulaire réactif
      public registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        tel: new FormControl('', [Validators.required]),
      })
    
      private addUser(): void {
        this.auth.signup(this.registerForm.value).subscribe(
          (data: any) => {
            console.log(data);
            this.message = true; //message de succès !
            this.router.navigate(['/login']);
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de l’inscription', error);
          }
        );
      }
    
      // Méthode appelée à la soumission du formulaire
      public onSubmit() 
      {
        this.submitted = true; // Marque le formulaire comme soumis
        if (this.registerForm.valid) 
        { // Vérifie si le formulaire est valide
          this.message = true; // Affiche un message si le formulaire est valide
          this.addUser(); // Appelle la méthode pour ajouter un auteur
          this.router.navigate(['login']); // Redirection vers la page de connexion
        }
      }
      public get userName()
      {
        return this.registerForm.controls["username"] //getter pour le champ userName.
      }
      public get email()
      {
        return this.registerForm.controls["email"] //getter pour le champ email.
      }
      public get password()
      {
        return this.registerForm.controls["password"]
      }
      public get tel()
      {
        return this.registerForm.controls["tel"] //getter pour le champ tel.
      }
}
