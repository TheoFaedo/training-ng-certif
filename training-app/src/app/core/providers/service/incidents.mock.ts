import { Incident } from '../../../shared/model/incident.model';

export const INCIDENTS: Incident[] = [
  {
    id: crypto.randomUUID(),
    title: 'Omg incident',
    description: '',
    status: 'new',
    priority: 'low',
    assignee: null,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Omg incident 2',
    description: '',
    status: 'new',
    priority: 'low',
    assignee: null,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Omg incident 3',
    description: '',
    status: 'new',
    priority: 'low',
    assignee: null,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
