//TODO types zacinat s T

export type TAvailableReservation = {
  id: number;
  date: string;
  capacity: number;
  reservedAmount: number;
  activityTypes: TServiceType[];
};

export type TServiceTypeDurationCost = {
  durationMinutes: number;
  cost: number;
};

export type TServiceType = {
  id: number;
  name: string;
  description: string;
  hexColor: string;
  serviceTypeDurationCosts: TServiceTypeDurationCost[];
};
