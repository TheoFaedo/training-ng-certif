import { LocationGPS } from './vehicle.model';

export enum MissionPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum MissionStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface MissionWaypoint {
  id: string;
  sequenceOrder: number;
  address: string;
  location: LocationGPS;
  estimatedArrival: string;
  actualArrival?: string;
  isCompleted: boolean;
  notes?: string;
}

export interface Mission {
  id: string;
  title: string;
  vehicleId: string;
  driverName: string;
  priority: MissionPriority;
  status: MissionStatus;
  startDate: string; // ISO String
  endDate: string;   // ISO String
  waypoints: MissionWaypoint[];
  totalDistanceMeters: number;
  createdAt: string;
}

// Utility Types
export type MissionCreateDTO = Omit<Mission, 'id' | 'createdAt' | 'status'> & {
  status?: MissionStatus;
};
