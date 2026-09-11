import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { incidentResolver } from './incident-resolver';

describe('incidentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => incidentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
