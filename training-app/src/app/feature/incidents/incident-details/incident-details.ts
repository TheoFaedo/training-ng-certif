import { Component, inject, input } from '@angular/core';
import { UiCard } from '../../../shared/component/ui-card/ui-card';
import { Incident } from '../../../shared/model/incident.model';
import { IncidentService } from '../../../core/providers/service/incident-service';
import { Router } from '@angular/router';

@Component({
  imports: [UiCard],
  selector: 'app-incident-details',
  styleUrl: './incident-details.less',
  templateUrl: './incident-details.html',
})
export class IncidentDetails {
  private readonly incidentService = inject(IncidentService);
  private readonly router = inject(Router);

  incident = input.required<Incident>();

  protected navigateEdit() {
    this.router.navigate(['incidents', this.incident().id, 'edit']);
  }

  protected remove() {
    this.incidentService.remove(this.incident().id).subscribe(() => {
      this.router.navigate(['incidents/new']);
    });
  }
}

export default IncidentDetails;
