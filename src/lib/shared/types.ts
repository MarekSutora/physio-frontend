export type AvailableReservation = {
  id: number;
  date: string;
  capacity: number;
  reservedAmount: number;
  activityTypes: ActivityType[];
};

export type ActivityType = {
  id: number;
  name: string;
  description: string;
  cost: number;
  duration: number;
  hexColor: string;
};
