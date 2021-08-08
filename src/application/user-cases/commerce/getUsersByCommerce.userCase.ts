import { iRepository } from "../../../application/repository";
import { Commerce } from "../../../domain";
import { CommerceUser } from "../../../domain/commerceUser.interface";

export const getUsersByCommerceUserCase = async (
  commerceRepository: iRepository<Commerce>,
  userRepository: iRepository<CommerceUser>,
  commercePhoneNumber: string
): Promise<CommerceUser[]> => {
  throw "Not implement yet";
};
