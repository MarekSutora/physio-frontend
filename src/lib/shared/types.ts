export type TDurationCost = {
  durationMinutes: number;
  cost: number;
};

export type TCU_ServiceType = {
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
  stdcs: DurationCosts[];
};

export type DurationCosts = {
  id?: number;
  durationMinutes: number;
  cost: number;
};

export type TC_Appointment = {
  startTime: Date;
  capacity: number;
  stdcIds: number[];
};

export type TG_UnbookedAppointment = {
  id: number;
  startTime: string;
  capacity: number;
  reservedCount: number;
  serviceTypeInfos: TG_ServiceTypeInfo[];
};

export type TG_ServiceTypeInfo = {
  astdcId: number;
  name: string;
  hexColor: string;
  durationMinutes: number;
  cost: number;
};

export type TG_PatientForBookedAppointment = {
  personId: number;
  firstName: string;
  secondName: string;
};

export type TC_AdminBookedAppointment = {
  patientId: number;
  startTime: Date;
  stdcId: number;
};

export type TC_ClientBookedAppointment = {
  arstdcId: number;
  patientId: number;
};

export type TG_BookedAppointment = {
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

export type TRegistrationFormData = {
  firstName: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export type TResponseResult = {
  success: boolean;
  message: string;
};
