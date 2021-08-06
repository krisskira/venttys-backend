export type ObjectType = { [key: string]: unknown };

export interface iRepository<T> {
  get: () => Promise<T>;
  getById: () => Promise<T>;
}
