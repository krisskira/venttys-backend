import { OperationStatus } from "@appDomain/";

export type ObjectType = { [key: string]: unknown };

export interface iRepository<T> {
  get: () => Promise<T[]>;
  getById: (id: string | number) => Promise<T[]>;
  create: (data: T) => Promise<string>;
  update: (data: Partial<T>) => Promise<OperationStatus>;
  deactivate: (id: string | number) => Promise<OperationStatus>;
}
