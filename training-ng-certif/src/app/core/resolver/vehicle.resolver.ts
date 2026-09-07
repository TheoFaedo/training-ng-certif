import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VehicleService } from '../provider/service/vehicle.service';
import { Vehicle } from '../../shared/model/vehicle.model';

export const vehicleResolver: ResolveFn<Vehicle | null> = (route, state) => {
  const vehicleService = inject(VehicleService);
  const vehicleId = route.paramMap.get('id')!;

  return vehicleService.getVehicle(vehicleId);
};
