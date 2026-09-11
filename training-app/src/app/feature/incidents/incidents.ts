import { Component, effect, inject, InjectionToken, model, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IncidentService } from '../../core/providers/service/incident-service';
import { IncidentTable } from './incident-table/incident-table';
import { SearchBar } from './search-bar/search-bar';

@Component({
  imports: [RouterOutlet, IncidentTable, SearchBar],
  selector: 'app-incidents',
  styleUrl: './incidents.less',
  templateUrl: './incidents.html',
  providers: [],
})
export class Incidents {
  private readonly incidentService = inject(IncidentService);
  private readonly router = inject(Router);

  selectedId = signal(null);
  incidentsResource = this.incidentService.allResource;

  constructor() {
    effect(() => {
      if (this.selectedId() === null) return;
      console.log(this.selectedId());
      this.router.navigate(['/incidents', this.selectedId()]);
    });
  }

  navigateToCreateIncident() {
    this.router.navigate(['/incidents/new']);
  }
}

export default Incidents;
