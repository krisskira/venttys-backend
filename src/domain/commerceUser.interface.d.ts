import { ROL } from ".";

export interface CommerceUser {
  auth_id: string;
  address: string;
  comerce: string;
  email: string;
  name: string;
  phone: string;
  rol: ROL;
  password?: string;
}
