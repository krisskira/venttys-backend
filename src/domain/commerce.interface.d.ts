import { Day, PaymentMethod, Time } from ".";

export interface CommerceBasicInfo {
  name: string;
  phoneNumber: string;
}

export type CommerceStatus = "Open" | "Close";

export interface CommerceMessage {
  enable: boolean;
  value: string;
}

export interface CommerceScheduleDate {
  name: string;
  number_day: number;
  code: Day;
  close: Time;
  enable: boolean;
}

export interface Commerce {
  name: string;
  phone: string;
  address: string;
  state: string;
  enable: boolean;
  paymentMehods: PaymentMethod[];
  delivery_price: number;
  delivery_time: string;
  commerce_status: CommerceStatus;
  messages: {
    open: CommerceMessage;
    await: CommerceMessage;
    close: CommerceMessage;
  };
  schedules: {
    monday: CommerceScheduleDate;
    tuesday: CommerceScheduleDate;
    wednesday: CommerceScheduleDate;
    thursday: CommerceScheduleDate;
    friday: CommerceScheduleDate;
    saturday: CommerceScheduleDate;
    sunday: CommerceScheduleDate;
    holiday: CommerceScheduleDate;
  };
}
