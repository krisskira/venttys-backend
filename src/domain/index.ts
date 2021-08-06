import { iApplicationContext } from "../infrastructure/interfaces/application.interface";

export type ObjectType = { [key: string]: unknown };
export type Controller<Targs, Tresp> = (args?: Targs, context?: iApplicationContext) => Tresp;
