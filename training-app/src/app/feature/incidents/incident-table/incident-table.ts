import { Component, ElementRef, input, model, TemplateRef, viewChild } from '@angular/core';
import { Incident } from '../../../shared/model/incident.model';
import { IncidentTableCell } from './incident-table-cell/incident-table-cell';

@Component({
  imports: [IncidentTableCell],
  selector: 'app-incident-table',
  styleUrl: './incident-table.less',
  templateUrl: './incident-table.html',
})
export class IncidentTable {
  incidents = input.required<Incident[]>();
  selectedId = model<string | null>(null);

  searchField = viewChild.required<ElementRef>('[search-field]');
  priorityCellTemplate = viewChild.required<TemplateRef<any>>('priorityCellTemplate');

  protected select(id: string) {
    this.selectedId.set(id);
  }
}
