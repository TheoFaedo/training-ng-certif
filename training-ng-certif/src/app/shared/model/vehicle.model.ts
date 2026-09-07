export enum VehicleType {
  VAN = 'VAN',
  TRUCK = 'TRUCK',
  CARGO_BIKE = 'CARGO_BIKE',
  EV_VAN = 'EV_VAN',
}

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  IN_TRANSIT = 'IN_TRANSIT',
  MAINTENANCE = 'MAINTENANCE',
  OFFLINE = 'OFFLINE',
}

export interface LocationGPS {
  latitude: number;
  longitude: number;
  altitudeMeters?: number;
}

export interface TelemetryData {
  vehicleId: string;
  speedKmH: number;
  fuelOrBatteryLevel: number; // percentage 0-100
  engineTemperatureC: number;
  location: LocationGPS;
  lastSignalTimestamp: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  licensePlate: string;
  modelName: string;
  type: VehicleType;
  status: VehicleStatus;
  maxPayloadKg: number;
  currentDriverName?: string;
  odometerKm: number;
  telemetry: TelemetryData;
}

// Utility Types derivations
export type VehicleSummary = Pick<
  Vehicle,
  'id' | 'licensePlate' | 'modelName' | 'type' | 'status'
>;
export type VehicleCreatePayload = Omit<Vehicle, 'id' | 'telemetry'>;
export type VehicleUpdatePayload = Partial<VehicleCreatePayload>;
export type ReadonlyVehicle = Readonly<Vehicle>;
