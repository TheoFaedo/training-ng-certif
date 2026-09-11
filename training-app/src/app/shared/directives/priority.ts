import { Directive, input } from '@angular/core';
import { IncidentPriority } from '../model/incident.model';

@Directive({
  selector: '[incidentPriority], [data-priority]',
  exportAs: 'incidentPriority',
  host: {
    '[class.low-priority]': 'priority() === "low"',
    '[class.medium-priority]': 'priority() === "medium"',
    '[class.high-priority]': 'priority() === "high"',
    '[class.critical-priority]': 'priority() === "critical"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class PriorityDirective {
  incidentPriority = input<IncidentPriority | undefined>();
  dataPriority = input<IncidentPriority | undefined>(undefined, { alias: 'data-priority' });

  priority() {
    return this.incidentPriority() ?? this.dataPriority();
  }

  ariaLabel() {
    const labels: Record<IncidentPriority, string> = {
      low: 'Priorité faible',
      medium: 'Priorité moyenne',
      high: 'Priorité élevée',
      critical: 'Priorité critique',
    };

    const priority = this.priority();
    return priority ? labels[priority] : null;
  }
}
