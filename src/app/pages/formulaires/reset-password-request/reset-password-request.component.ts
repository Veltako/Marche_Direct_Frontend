import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  standalone: true,
  imports: [ ReactiveFormsModule],
})
export class ResetPasswordRequestComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      this.http.post(`${environment.apiUrl}/request-password-reset`, { email }).subscribe({
        next: () => { 
          alert('Email de réinitialisation envoyé !');
        this.router.navigate(['/login']);
      },
        error: () => alert('Erreur lors de l\'envoi de l\'email de réinitialisation')
      });
    }
  }
}
