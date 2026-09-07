import { Component, model, signal } from '@angular/core';
import { ALERT_SEVERITIES, AlertSeverity } from '../model/alert.model';

@Component({
  selector: 'app-priority-picker',
  imports: [],
  templateUrl: './priority-picker.component.html',
  styleUrl: './priority-picker.component.less',
})
export class PriorityPickerComponent<T> {
  model = model<AlertSeverity>('CRITICAL');

  protected severities = ALERT_SEVERITIES;
}
