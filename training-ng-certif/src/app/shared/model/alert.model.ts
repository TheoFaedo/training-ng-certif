export const ALERT_SEVERITIES = [
  'INFO',
  'WARNING',
  'DANGER',
  'CRITICAL',
] as const;

export type AlertSeverity = (typeof ALERT_SEVERITIES)[number];

export interface FleetAlert {
  id: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  severity: AlertSeverity;
  message: string;
  htmlContent: string; // Dynamic HTML for sanitizer testing
  timestamp: string;
  acknowledged: boolean;
}
