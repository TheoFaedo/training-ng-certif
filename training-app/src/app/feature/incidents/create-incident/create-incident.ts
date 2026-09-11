import { Component, signal } from '@angular/core';
import { ComponentForm } from '../../../shared/component-form';
import { IncidentForm } from '../../../shared/component/incident-form/incident-form';

@Component({
  imports: [IncidentForm],
  selector: 'app-create-incident',
  styleUrl: './create-incident.less',
  templateUrl: './create-incident.html',
})
export class CreateIncident implements ComponentForm {
  public hasUnsavedChanges = signal<boolean>(false);

  protected updateUnsavedChanges(value: boolean) {
    this.hasUnsavedChanges.set(value);
  }
}

export default CreateIncident;
