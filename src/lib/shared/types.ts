export type TDurationCost = {
  durationMinutes: number;
  cost: number;
};

export type TAU_ServiceType = {
  //TODO TCU
  id: number | null;
  name: string;
  description: string;
  hexColor: string;
  durationCosts: TDurationCost[];
};

export type TG_ServiceType = {
  id: number;
  name: string;
  description: string;
  hexColor: string;
  stdcs: TSTDC[];
};

export type TSTDC = {
  id: number | null;
  durationMinutes: number;
  cost: number;
};

export type TC_AvailableReservation = {
  startTime: Date;
  capacity: number;
  stdcIds: number[];
};

export type TG_AvailableReservation = {
  id: number;
  startTime: string;
  capacity: number;
  reservedAmount: number;
  serviceTypesWithCosts: TG_ServiceTypeWithCost[];
};

export type TG_ServiceTypeWithCost = {
  hexColor: string;
  arstdcId: number; // ID of the AvailableReservationServiceTypeDc
  serviceTypeName: string; // Name of the ServiceType
  durationMinutes: number;
  cost: number;
};
