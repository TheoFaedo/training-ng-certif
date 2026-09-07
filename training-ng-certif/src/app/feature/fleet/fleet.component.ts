import { Component, inject, signal } from '@angular/core';
import { VehicleService } from '../../core/provider/service/vehicle.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fleet',
  imports: [],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.less',
})
export class FleetComponent {
  vehiclesService = inject(VehicleService);

  protected readonly vehicles = toSignal(this.vehiclesService.getAll());

  hasUnsavedChanges() {
    return false;
  }
}

export default FleetComponent;
