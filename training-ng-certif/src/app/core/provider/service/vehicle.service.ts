import { Injectable, signal } from '@angular/core';
import { Vehicle } from '../../../shared/model/vehicle.model';
import {
  delay,
  filter,
  map,
  Observable,
  of,
  switchMap,
  throwIfEmpty,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

interface RequestOptions {
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly _vehicles = signal<Vehicle[]>([]);

  getVehicle(id: string) {
    return of(null).pipe(
      delay(1000),
      switchMap(() => {
        const vehicle = this._vehicles().find((v) => v.id === id);

        if (!vehicle) {
          throw new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found',
            error: {
              message: `Vehicle ${id} not found`,
            },
          });
        }

        return of(vehicle);
      }),
    );
  }

  getAll(options: RequestOptions = { offset: 0, limit: 100 }) {
    return of(null).pipe(
      delay(1000),
      switchMap(() =>
        of(
          this._vehicles().slice(
            options.offset,
            options.offset + options.limit,
          ),
        ),
      ),
    );
  }
}
