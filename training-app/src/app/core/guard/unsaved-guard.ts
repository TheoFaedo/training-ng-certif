import { Form } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';
import { ComponentForm } from '../../shared/component-form';

export const unsavedGuard: CanDeactivateFn<ComponentForm> = (component: ComponentForm) => {
  if (component.hasUnsavedChanges()) {
    return confirm('Are you sure ?');
  }

  return true;
};
