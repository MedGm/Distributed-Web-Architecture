import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employees/list/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/add',
    loadComponent: () => import('./pages/employees/add/employee-add.component').then(m => m.EmployeeAddComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/edit/:id',
    loadComponent: () => import('./pages/employees/edit/employee-edit.component').then(m => m.EmployeeEditComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/details/:id',
    loadComponent: () => import('./pages/employees/details/employee-details.component').then(m => m.EmployeeDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/employees'
  }
];
