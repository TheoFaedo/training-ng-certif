import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../../core/providers/service/incident-service';

@Component({
  imports: [FormsModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.less',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private readonly incidentService = inject(IncidentService);

  protected readonly query = this.incidentService.query;
}
