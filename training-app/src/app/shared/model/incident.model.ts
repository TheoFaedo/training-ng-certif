export type IncidentStatus = 'new' | 'investigating' | 'resolved';
export type IncidentPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Incident {
  id: string;
  title: string;
  description: string; // contenu fourni par un utilisateur
  status: IncidentStatus;
  priority: IncidentPriority;
  assignee?: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
