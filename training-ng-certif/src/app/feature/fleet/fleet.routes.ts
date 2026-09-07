import { Routes } from '@angular/router';
import { vehicleResolver } from '../../core/resolver/vehicle.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fleet.component'),
  },
  {
    path: ':id/details',
    loadComponent: async () =>
      import('./fleet-details/fleet-details.component'),
    resolve: {
      vehicle: vehicleResolver,
    },
  },
  {
    path: ':id/telemetry',
    loadComponent: async () =>
      import('./fleet-telemetry/fleet-telemetry.component'),
  },
];

export default routes;
