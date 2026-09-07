import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: async () =>
      import('./feature/dashboard/dashboard.component'),
  },
  {
    path: 'fleet',
    loadChildren: () => import('./feature/fleet/fleet.routes'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
