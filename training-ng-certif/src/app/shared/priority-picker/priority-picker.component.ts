import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ALERT_SEVERITIES, AlertSeverity } from '../model/alert.model';

@Component({
  selector: 'app-priority-picker',
  imports: [],
  templateUrl: './priority-picker.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './priority-picker.component.less',
})
export class PriorityPickerComponent<T> {
  model = model<AlertSeverity>('CRITICAL');

  protected severities = ALERT_SEVERITIES;
}
