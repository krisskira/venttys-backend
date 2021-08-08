import { iRepository } from "../../../application/repository";
import { Commerce } from "../../../domain";

export const getCommerceByPhoneNumberUserCase = async (
  reposirory: iRepository<Commerce>,
  commercePhoneNumber: string
): Promise<Commerce[]> => {
  return await reposirory.getById(commercePhoneNumber);
};
