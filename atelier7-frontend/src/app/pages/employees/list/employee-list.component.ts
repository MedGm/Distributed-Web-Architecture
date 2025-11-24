import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = '';
    this.employeeService.getAll().pipe(
      finalize(() => {
        // Garantit que loading est toujours false à la fin, même en cas d'erreur
        this.loading = false;
        this.cdr.detectChanges(); // Force la détection de changement
      })
    ).subscribe({
      next: (data) => {
        this.employees = data || [];
        console.log('Employees loaded:', this.employees.length);
        this.cdr.detectChanges(); // Force la détection de changement après réception des données
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des employés';
        console.error('Error loading employees:', err);
        this.cdr.detectChanges(); // Force la détection de changement en cas d'erreur
      }
    });
  }

  deleteEmployee(id: number | undefined): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  trackByEmployeeId(index: number, employee: Employee): number | undefined {
    return employee.id;
  }
}

