import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./feature/dashboard/dashboard'),
  },
  {
    path: 'incidents',
    loadComponent: () => import('./feature/incidents/incidents'),
    loadChildren: () => import('./feature/incidents/incidents.routes'),
  },
  { path: 'admin', loadComponent: () => import('./feature/admin/admin') },
  { path: '**', redirectTo: 'dashboard' },
];
