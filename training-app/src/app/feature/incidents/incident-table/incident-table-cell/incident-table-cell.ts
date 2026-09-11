import { Component, input, TemplateRef } from '@angular/core';
import { Incident } from '../../../../shared/model/incident.model';
import { NgTemplateOutlet } from '@angular/common';
import { PriorityDirective } from '../../../../shared/directives/priority';

@Component({
  imports: [NgTemplateOutlet, PriorityDirective],
  selector: 'tr[app-incident-table-cell]',
  styleUrl: './incident-table-cell.less',
  templateUrl: './incident-table-cell.html',
})
export class IncidentTableCell {
  incident = input.required<Incident>();
  priorityTemplate = input<TemplateRef<any> | null>(null);
}
