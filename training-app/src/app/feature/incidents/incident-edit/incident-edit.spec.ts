import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentEdit } from './incident-edit';

describe('IncidentEdit', () => {
  let component: IncidentEdit;
  let fixture: ComponentFixture<IncidentEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
