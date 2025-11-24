import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  loading: boolean = false;
  error: string = '';
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
        console.log('Employee details loaded:', this.employee);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'employé';
        console.error('Error loading employee details:', err);
        this.cdr.detectChanges(); // Force la détection de changement en cas d'erreur
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}

