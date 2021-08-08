import { iApplicationContext } from "../infrastructure/interfaces/application.interface";

/** APLICATION CONTEXT DATA TYPES  */

export type ObjectType = { [key: string]: unknown };

export type Controller<TArgsInput, TDataOutput> = (
  args?: TArgsInput,
  context?: iApplicationContext
) => TDataOutput;

/** BUSINESS LOGIC DATA TYPES */

export type PaymentMethod = string;
export type OperationStatus = "Completed" | "NoCompleted";
export type ROL = "managerial" | "operator";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "holiday";

export const DaysCode: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "holiday",
];

export const DayName = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
  "Festivo",
];

export type Time = {
  hour: number;
  minute: number;
  second?: number;
};
