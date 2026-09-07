import { FleetAlert } from '../../shared/model/alert.model';

export const MOCK_ALERTS: FleetAlert[] = [
  {
    id: 'alt-001',
    vehicleId: 'veh-003',
    vehicleLicensePlate: 'EE-789-FF',
    severity: 'WARNING',
    message: 'Niveau de carburant bas (34%)',
    htmlContent:
      '<span>Avertissement: <strong>Véhicule EE-789-FF</strong> nécessite un réapprovisionnement imminents.</span>',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alt-002',
    vehicleId: 'veh-004',
    vehicleLicensePlate: 'GG-012-HH',
    severity: 'DANGER',
    message: 'Batterie critique (15%) - Cargo Bike',
    htmlContent:
      '<span style="color: red;"><strong>DANGER:</strong> Cargo Bike GG-012-HH en batterie très faible !</span>',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alt-003',
    vehicleId: 'veh-005',
    vehicleLicensePlate: 'JJ-345-KK',
    severity: 'CRITICAL',
    message: 'Perte de signal GPS depuis > 1 heure',
    htmlContent:
      '<div class="alert-box"><strong>ALERTE CRITIQUE:</strong> Perte de télémétrie sur JJ-345-KK. <em>Vérifier la connexion.</em></div>',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    acknowledged: true,
  },
];
