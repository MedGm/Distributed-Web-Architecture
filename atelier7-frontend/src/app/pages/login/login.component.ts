import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si déjà authentifié, rediriger vers la liste des employés
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/employees']);
    }
  }

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

