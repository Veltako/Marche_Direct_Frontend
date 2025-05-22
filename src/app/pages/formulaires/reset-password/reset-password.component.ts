import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const { password, confirmPassword } = this.resetPasswordForm.value;

      if (password === confirmPassword) {
        this.authService.resetPassword(this.token, password).subscribe({
          next: () => {
            this.message = 'Mot de passe réinitialisé avec succès !';
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.message = 'Une erreur est survenue lors de la réinitialisation.';
          }
        });
      } else {
        this.message = 'Les mots de passe ne correspondent pas.';
      }
    }
  }
}
