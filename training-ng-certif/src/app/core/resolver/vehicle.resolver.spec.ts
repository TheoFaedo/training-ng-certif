import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { vehicleResolver } from './vehicle.resolver';
import { Vehicle } from '../../shared/model/vehicle.model';

describe('carResolver', () => {
  const executeResolver: ResolveFn<Vehicle | null> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => vehicleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
