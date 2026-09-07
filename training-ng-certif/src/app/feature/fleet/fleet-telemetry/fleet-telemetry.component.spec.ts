import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetTelemetryComponent } from './fleet-telemetry.component';

describe('FleetTelemetryComponent', () => {
  let component: FleetTelemetryComponent;
  let fixture: ComponentFixture<FleetTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetTelemetryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
