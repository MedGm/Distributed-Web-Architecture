import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    salary: 0
  };
  error: string = '';
  loading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    
    // Validation côté client : le salaire doit être supérieur à 0
    if (this.employee.salary <= 0) {
      this.error = 'Le salaire doit être supérieur à 0';
      return;
    }

    this.loading = true;

    this.employeeService.create(this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        // Gestion améliorée des erreurs
        if (err.status === 403) {
          this.error = 'Accès refusé. Vérifiez que le salaire est supérieur à 0 et que vous avez les permissions nécessaires.';
        } else if (err.status === 400) {
          // Erreur de validation du backend
          const errorMessage = err.error?.message || err.error?.error || 'Erreur de validation';
          this.error = errorMessage;
        } else {
          this.error = err.error?.message || 'Erreur lors de la création de l\'employé';
        }
        this.loading = false;
        console.error('Error creating employee:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}

