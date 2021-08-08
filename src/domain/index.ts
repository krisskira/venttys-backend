import { iApplicationContext } from "../infrastructure/interfaces/application.interface";

export type ObjectType = { [key: string]: unknown };

export type Controller<Targs, Tresp> = (
  args?: Targs,
  context?: iApplicationContext
) => Tresp;

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "holiday";
export type OperationStatus = "Completed" | "NoCompleted"
export type Time = {
  hour: number;
  minute: number;
  second?: number;
};

export type PaymentMethod = string;

export * from './commerce.interface';
