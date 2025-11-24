import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    salary: 0
  };
  error: string = '';
  loading: boolean = false;
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    if (!this.employeeId) return;

    this.loading = true;
    this.employeeService.getOne(this.employeeId).pipe(
      finalize(() => {
        // Garantit que loading est toujours false à la fin, même en cas d'erreur
        this.loading = false;
        this.cdr.detectChanges(); // Force la détection de changement
      })
    ).subscribe({
      next: (data) => {
        this.employee = data;
        this.cdr.detectChanges(); // Force la détection de changement après réception des données
        console.log('Employee loaded:', this.employee);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'employé';
        console.error('Error loading employee:', err);
        this.cdr.detectChanges(); // Force la détection de changement en cas d'erreur
      }
    });
  }

  onSubmit(): void {
    if (!this.employeeId) return;

    this.error = '';
    
    // Validation côté client : le salaire doit être supérieur à 0
    if (this.employee.salary <= 0) {
      this.error = 'Le salaire doit être supérieur à 0';
      return;
    }

    this.loading = true;

    this.employeeService.update(this.employeeId, this.employee).subscribe({
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
          this.error = err.error?.message || 'Erreur lors de la mise à jour de l\'employé';
        }
        this.loading = false;
        console.error('Error updating employee:', err);
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

