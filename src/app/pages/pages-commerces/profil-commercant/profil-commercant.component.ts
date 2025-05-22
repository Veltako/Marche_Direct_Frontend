import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-profil-commercant',
  standalone: true,
  imports: [ReactiveFormsModule, DateFormatPipe, NgIf],
  templateUrl: './profil-commercant.component.html',
  styleUrl: './profil-commercant.component.css'
})
export class ProfilCommercantComponent implements OnInit {
  urlImg = "https://127.0.0.1:8000/images/";
  userInfo: any;
  selectedFile: File | null = null;
  selectedItem: any;
  userInfoForm!: FormGroup;

  authService = inject(AuthService);
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    // Initialisation du formulaire avec des champs vides
    this.userInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      numSiret: ['', Validators.required],
      nameBusiness: ['', Validators.required],
      tel: ['', Validators.required]
    });

    const userId = this.authService.decodedToken ? this.authService.decodedToken.id : null;
    if (userId !== null) {
      this.authService.getUserById(userId).subscribe(
        (data) => {
          this.userInfo = data;
          // Utilisation de patchValue pour pré-remplir le formulaire
          this.userInfoForm.patchValue({
            email: this.userInfo.email,
            numSiret: this.userInfo.numSiret,
            nameBusiness: this.userInfo.nameBusiness,
            tel: this.userInfo.tel
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
      );
    }
  }

  openModalModif(): void {
    const modalElement = document.getElementById('modifImage');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openModalInfo(): void {
    const modalElement = document.getElementById('modifInfo');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpdateImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.userService.uploadImage(this.authService.decodedToken.id, formData).subscribe({
        next: (response) => {
          console.log('Upload réussi', response);
          this.userInfo.imageFileName = response.filename;
          // Fermer la modal après la modification
          const modalElement = document.getElementById('modifImage');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'upload', error);
        }
      });
    }
  }

  onUpdateInfo(): void {
    if (this.userInfoForm.valid) {
      const formData = this.getUpdatedFields(); // Obtenir uniquement les champs modifiés

      if (Object.keys(formData).length > 0) { // Vérifier qu'il y a des changements
        this.userService.updateInfo(this.authService.decodedToken.id, formData).subscribe({
          next: (response) => {
            console.log('Mise à jour réussie', response);
            this.userInfo = { ...this.userInfo, ...formData }; // Mettre à jour localement les infos utilisateur
            const modalElement = document.getElementById('modifInfo');
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              modal.hide();
            }
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour des informations', error, formData);
          }
        });
      }
    }
  }

  getUpdatedFields(): any {
    const updatedFields: any = {};

    Object.keys(this.userInfoForm.controls).forEach(key => {
      const currentValue = this.userInfoForm.get(key)?.value;
      const originalValue = this.userInfo[key];
      if (currentValue !== originalValue) {
        updatedFields[key] = currentValue;
      }
    });

    return updatedFields;
  }
}
