import { Routes } from '@angular/router';
import { incidentResolver } from '../../core/resolver/incident-resolver';
import { unsavedGuard } from '../../core/guard/unsaved-guard';

export const routes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./create-incident/create-incident'),
    canDeactivate: [unsavedGuard],
  },
  {
    path: ':id',
    loadComponent: () => import('./incident-details/incident-details'),
    resolve: {
      incident: incidentResolver,
    },
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./incident-edit/incident-edit'),
    resolve: {
      incident: incidentResolver,
    },
  },
  { path: '**', redirectTo: 'new' },
];

export default routes;
