import {
  Mission,
  MissionPriority,
  MissionStatus,
} from '../../shared/model/mission.model';

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'msn-101',
    title: 'Livraison Express Centre-Ville Paris',
    vehicleId: 'veh-001',
    driverName: 'Alice Dupont',
    priority: MissionPriority.HIGH,
    status: MissionStatus.IN_PROGRESS,
    startDate: new Date(Date.now() - 7200000).toISOString(),
    endDate: new Date(Date.now() + 14400000).toISOString(),
    totalDistanceMeters: 14500,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    waypoints: [
      {
        id: 'wp-1',
        sequenceOrder: 1,
        address: '15 Rue de Rivoli, 75004 Paris',
        location: { latitude: 48.8558, longitude: 2.3589 },
        estimatedArrival: new Date(Date.now() - 3600000).toISOString(),
        actualArrival: new Date(Date.now() - 3500000).toISOString(),
        isCompleted: true,
        notes: 'Colis déposé au gardien',
      },
      {
        id: 'wp-2',
        sequenceOrder: 2,
        address: '88 Avenue des Champs-Élysées, 75008 Paris',
        location: { latitude: 48.8711, longitude: 2.3045 },
        estimatedArrival: new Date(Date.now() + 3600000).toISOString(),
        isCompleted: false,
        notes: 'Accès code 45A12',
      },
    ],
  },
  {
    id: 'msn-102',
    title: 'Transfert Logistique Lyon - Villeurbanne',
    vehicleId: 'veh-003',
    driverName: 'Bob Martin',
    priority: MissionPriority.CRITICAL,
    status: MissionStatus.SCHEDULED,
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 108000000).toISOString(),
    totalDistanceMeters: 42000,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    waypoints: [
      {
        id: 'wp-3',
        sequenceOrder: 1,
        address: '10 Place Bellecour, 69002 Lyon',
        location: { latitude: 45.7578, longitude: 4.832 },
        estimatedArrival: new Date(Date.now() + 86400000).toISOString(),
        isCompleted: false,
      },
    ],
  },
];
