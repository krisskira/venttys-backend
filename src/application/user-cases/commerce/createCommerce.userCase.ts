import { iRepository } from "../../../application/repository";
import { Commerce, OperationStatus } from "../../../domain";

export const createCommerceUserCase = async (
  commerceRepository: iRepository<Commerce>,
  commerceData: Commerce
): Promise<string> => {
  return await commerceRepository.create(commerceData);
};
