import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup; // Formulaire pour l'édition de l'utilisateur
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire avec des validations
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      nameBusiness: [''],
      descriptionCommerce: [''],
      numSiret: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; // Récupérer l'ID de l'utilisateur à partir de l'URL

    // Récupérer les informations de l'utilisateur et remplir le formulaire
    this.userService.getUserProfile(userId).subscribe(
      (data: User) => {
        this.user = data;
        this.userForm.patchValue({
          userName: data.userName,
          email: data.email,
          tel: data.tel,
          nameBusiness: data.nameBusiness,
          descriptionCommerce: data.descriptionCommerce,
          numSiret: data.numSiret
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }

  // Méthode pour soumettre le formulaire et enregistrer les modifications
  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value }; // Valeurs mises à jour

      this.userService.updateUserProfile(updatedUser).subscribe(
        () => {
          console.log('Profil mis à jour avec succès');
          this.router.navigate(['/user/profil/', updatedUser.id]); // Rediriger vers le profil mis à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du profil utilisateur', error);
        }
      );
    }
  }
}
