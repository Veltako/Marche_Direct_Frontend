import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { FormContactService } from '../../../services/form-contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent
{
  contactForm: FormGroup; // groupe de formulaires pour le contact.

  constructor(private fb: FormBuilder,  private userService: UserService, private contactService: FormContactService) 
  {
    this.contactForm = this.fb.group({ //Mise en place du formulaire avec des validations.
      userName: ['', [Validators.required, Validators.minLength(3)]], // Champ 'userName' avec validation requise et longueur minimale.
      email: ['', [Validators.required, Validators.email]], // Champ 'email' avec validation.
      tel: ['', [Validators.required]], // Champ 'tel' avec validation.
      nameBusiness: ['', [Validators.minLength(3)]], // Champ 'nameBusiness' avec validation et longueur minimale (nom d'entreprise pas obligatoire donc j'enlève le required).
      checkbox: [false, [Validators.requiredTrue]], // Champ 'checkbox' avec validation.
      comment: ['', [Validators.required, Validators.minLength(10)]] // Champ 'comment avec validation et longueur minimale.
    })
  }

  submitted: boolean = false; // Indicateur pour soumission d'un formulaire.
  message: boolean = false; // Indicateur pour l'affichage d'un message.

  public envoyer() : void // Méthode pour soumettre le formulaire.
  {
    this.submitted = true; // Marque le formulaire comme soumis.

    if (this.contactForm.valid) // vérif si le formulaire est valide.
    {
      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Email envoyé avec succès', response);
          this.message = true; //message de succès
        },
        error: (err:HttpErrorResponse) => {
          console.log('Erreur lors de l\'envoi de l\'email', err);
        }
      })
    }
  }

  public get userName()
  {
    return this.contactForm.controls["userName"] //getter pour le champ userName.
  }
  public get email()
  {
    return this.contactForm.controls["email"] //getter pour le champ email.
  }
  public get tel()
  {
    return this.contactForm.controls["tel"] //getter pour le champ tel.
  }
  public get nameBusiness()
  {
    return this.contactForm.controls["nameBusiness"] //getter pour le champ nameBusiness.
  }
  public get checkbox() 
  {
    return this.contactForm.controls["checkbox"]//getter pour le champ checkbox.
  }
  public get comment()
  {
    return this.contactForm.controls["comment"]//getter pour le champ comment.
  }
}
