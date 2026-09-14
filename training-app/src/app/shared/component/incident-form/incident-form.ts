import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { Incident, IncidentPriority, IncidentStatus } from '../../../shared/model/incident.model';
import { IncidentService } from '../../../core/providers/service/incident-service';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';

type FormMode = 'create' | 'edit';

interface IncidentFormModel {
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
}

const EMPTY_FORM: IncidentFormModel = {
  title: '',
  description: '',
  status: 'new' as IncidentStatus,
  priority: 'low',
};

@Component({
  imports: [FormField],
  selector: 'app-incident-form',
  styleUrl: './incident-form.less',
  templateUrl: './incident-form.html',
})
export class IncidentForm {
  private readonly incidentService = inject(IncidentService);

  incident = input<Incident | null>(null);
  dirtyUpdate = output<boolean>();

  mode = computed<FormMode>(() => (this.incident() ? 'edit' : 'create'));
  initValue = computed(() => this.getInitValue(this.mode()));

  private getInitValue(mode: string): IncidentFormModel {
    console.log(mode);
    if (mode === 'create') {
      return EMPTY_FORM;
    }
    return this.incident() as IncidentFormModel;
  }

  private readonly createIncidentModel = linkedSignal<IncidentFormModel>(this.initValue);
  protected readonly form = form(this.createIncidentModel, (schemaPath) => {
    const titleMessage = 'Title must be between 5 and 100 characters.';

    required(schemaPath.title, { message: titleMessage });
    minLength(schemaPath.title, 5, { message: titleMessage });
    maxLength(schemaPath.title, 100, { message: titleMessage });
    required(schemaPath.priority);
    required(schemaPath.status);
    required(schemaPath.description, {
      when: ({ valueOf }) => valueOf(schemaPath.priority) === 'critical',
      message: 'Description required for critical incidents.',
    });
  });

  protected readonly errorMessages = computed(() =>
    this.form()
      .errorSummary()
      .map((e) => e.message)
      .filter((e) => e !== undefined),
  );

  protected readonly incidentStatuses: { label: string; value: IncidentStatus }[] = [
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Investigating',
      value: 'investigating',
    },
    {
      label: 'Resolved',
      value: 'resolved',
    },
  ];

  protected readonly incidentPriorities: { label: string; value: IncidentPriority }[] = [
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Critical',
      value: 'critical',
    },
  ];

  constructor() {
    effect(() => {
      console.log(this.incident());
      console.log(this.mode());
    });

    effect(() => {
      this.dirtyUpdate.emit(this.form().dirty());
    });
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    if (!this.form().valid()) {
      return;
    }

    if (this.mode() === 'create') {
      this.createIncident();
    } else {
      this.editIncident();
    }
  }

  private createIncident() {
    this.incidentService
      .add({
        title: this.form.title().value(),
        description: this.form.description().value(),
        priority: this.form.priority().value(),
        tags: [],
      })
      .subscribe(() => this.form().reset(this.initValue()));
  }

  private editIncident() {
    const id = this.incident()?.id;
    if (!id) {
      return;
    }

    this.incidentService
      .update({
        id: id,
        title: this.form.title().value(),
        description: this.form.description().value(),
        priority: this.form.priority().value(),
        status: this.form.status().value(),
        tags: [],
      })
      .subscribe((incid) => this.form().reset(incid));
  }
}
