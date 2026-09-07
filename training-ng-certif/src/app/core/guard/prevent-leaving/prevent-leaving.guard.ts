import { CanDeactivateFn } from '@angular/router';
import FleetComponent from '../../../feature/fleet/fleet.component';

export const unsavedChangesGuard: CanDeactivateFn<FleetComponent> = (
  component: FleetComponent,
  currentRoute,
  currentState,
  nextState,
) => {
  return component.hasUnsavedChanges()
    ? confirm('You have unsaved changes. Are you sure you want to leave?')
    : true;
};
