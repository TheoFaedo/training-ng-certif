import { Component, input, signal } from '@angular/core';
import { ComponentForm } from '../../../shared/component-form';
import { IncidentForm } from '../../../shared/component/incident-form/incident-form';
import { Incident } from '../../../shared/model/incident.model';

@Component({
  imports: [IncidentForm],
  selector: 'app-incident-edit',
  styleUrl: './incident-edit.less',
  templateUrl: './incident-edit.html',
})
export class IncidentEdit implements ComponentForm {
  public hasUnsavedChanges = signal<boolean>(false);
  incident = input.required<Incident>();

  protected updateUnsavedChanges(value: boolean) {
    this.hasUnsavedChanges.set(value);
  }
}

export default IncidentEdit;
