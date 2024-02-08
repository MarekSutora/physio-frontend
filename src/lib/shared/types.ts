export type TServiceTypeDurationCost = {
  id: number | null;
  durationMinutes: number;
  cost: number;
};

export type TServiceType = {
  id: number | null;
  name: string;
  description: string;
  hexColor: string;
  serviceTypeDurationCosts: TServiceTypeDurationCost[];
};

export type TAvailableReservation = {
  id: number | null;
  date: Date;
  capacity: number;
  serviceTypeIds: number[];
  reservedAmount: number;
};
