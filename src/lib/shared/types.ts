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
  appointmentId: number;
  startTime: Date;
  durationMinutes: number;
  serviceTypeName: string;
  clientFirstName: string;
  clientSecondName: string;
  cost: number;
  hexColor: string;
  capacity: number;
  appointmentBookedDate: Date;
  clientId: number;
};

//BLOG

export type TBlogPost = {
  id?: number;
  title: string;
  author: string;
  datePublished: string;
  keywordsString: string;
  mainImageUrl: string;
  htmlContent: string;
  isHidden: boolean;
  slug?: string;
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

//APPOINTMENT

export type TAppointment = {
  id: number;
  capacity: number;
  startTime: Date;
  bookedAppointments: TG_BookedAppointment[];
  appointmentDetail: TAppointmentDetail;
};

export type TAppointmentDetail = {
  appId?: number;
  note?: string;
  appointmentExerciseDetails: TAppointmentExerciseDetail[] | [];
};

export type TAppointmentExerciseDetail = {
  exerciseType: TExerciseType;
  weight?: number | null;
  numberOfRepetitions?: number | null;
  numberOfSets?: number | null;
  durationInMinutes?: number | null;
  restAfterExerciseInMinutes?: number | null;
  restBetweenSetsInMinutes?: number | null;
  order: number;
  successfullyPerformed: boolean;
};

export type TExerciseType = {
  id: number;
  name: string;
};

//STATISTICS

export type TServiceTypeStatistics = {
  year: number;
  month: number;
  serviceTypeName: string;
  finishedAppointmentsCount: number;
  hexColor: string;
};

export type TRevenueStatistics = {
  year: number;
  month: number;
  totalRevenue: number;
};

export type TNewClientsStatistics = {
  year: number;
  month: number;
  newClientsCount: number;
};

export type TBlogPostViewsStats = {
  year: number;
  month: number;
  viewsCount: number;
};

export type TGeneralStatistics = {
  serviceTypeStatistics: TServiceTypeStatistics[];
  revenueStatistics: TRevenueStatistics[];
  newClientsStatistics: TNewClientsStatistics[];
  blogPostViewsStatistics: TBlogPostViewsStats[];
};

//CLIENT

export type TClient = {
  personId: number;
  registeredDate: Date;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
};
