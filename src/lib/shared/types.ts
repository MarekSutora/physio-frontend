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
  arstdcId: number;
  serviceTypeName: string;
  durationMinutes: number;
  cost: number;
};

export type TG_PatientForBookedReservation = {
  personId: number;
  firstName: string;
  secondName: string;
};

export type TC_AdminBookedReservation = {
  patientId: number;
  startTime: Date;
  stdcId: number;
};

export type TC_ClientBookedReservation = {
  arstdcId: number;
  patientId: number;
};

export type TG_BookedReservation = {
  id: number;
  date: Date;
  duration: number;
  serviceTypeName: string;
  person: string;
  cost: number;
  note: string;
  hexColor: string;
};

//OTHER

export type ServiceTypeOptionType = {
  label: string;
  value: string;
  color: string | null;
};
