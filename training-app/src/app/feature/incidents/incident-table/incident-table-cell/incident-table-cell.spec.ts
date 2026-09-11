import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentTableCell } from './incident-table-cell';

describe('IncidentTableCell', () => {
  let component: IncidentTableCell;
  let fixture: ComponentFixture<IncidentTableCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentTableCell],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentTableCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
