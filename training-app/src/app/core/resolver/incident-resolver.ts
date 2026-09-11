import { inject } from '@angular/core/primitives/di';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { IncidentService } from '../providers/service/incident-service';
import { Incident } from '../../shared/model/incident.model';
import { catchError, of } from 'rxjs';

export const incidentResolver: ResolveFn<Incident> = (route) => {
  const incidentService = inject(IncidentService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  return incidentService.getById(id).pipe(
    catchError((error) => {
      console.error('Failed to load user:', error);
      return of(new RedirectCommand(router.parseUrl('/incidents/new')));
    }),
  );
};
