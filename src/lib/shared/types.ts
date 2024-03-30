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
  imageUrl: string;
  iconName: string;
};

export type TG_ServiceType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  hexColor: string;
  iconName: string;
  imageUrl: string;
  stdcs: ServiceTypeDurationCosts[];
};

export type ServiceTypeDurationCosts = {
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

export type TG_ClientForBookedAppointment = {
  personId: number;
  firstName: string;
  secondName: string;
};

export type TC_AdminBookedAppointment = {
  personId: number;
  startTime: Date;
  stdcId: number;
};

export type TC_ClientBookedAppointment = {
  arstdcId: number;
  personId: number;
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
  personId: number;
};

//BLOG

export type TBlogPost = {
  title: string;
  author: string;
  datePublished: string;
  keywordsString: string;
  mainImageUrl: string;
  htmlContent: string;
  isHidden: boolean;
  slug?: string;
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

export type TClientNote = {
  id?: number;
  personId: number;
  note: string;
  createdAt?: Date;
};

//AUTH

export type TResetPasswordFormData = {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
};

export type TUser = {
  userId: string;
  fullName: string;
  roles: string[];
  personId: number;
};

//OTHER

export type TMainPageLink = {
  text: string;
  path?: string;
  subMenuItems?: { text: string; path: string }[];
};

export type ServiceTypeOptionType = {
  label: string;
  value: string;
  color: string | null;
};

export type TRegistrationFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export type TResponseResult = {
  success: boolean;
  message: string;
};

export type TReview = {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: Date;
  link: string;
  personPictureUrl: string;
};

export type TContactFormData = {
  name: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  message: string;
};
