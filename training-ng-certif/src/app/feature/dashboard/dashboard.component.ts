import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WidgetCardComponent } from '../../shared/widget-card/widget-card.component';
import { PriorityPickerComponent } from '../../shared/priority-picker/priority-picker.component';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetCardComponent, PriorityPickerComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.component.less',
})
export class DashboardComponent {}

export default DashboardComponent;
