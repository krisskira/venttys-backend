import { iRepository } from "../../../application/repository";
import { OperationStatus } from "../../../domain";
import { Commerce } from "../../../domain/commerce.interface";

export const createCommerceUserCase = async (
  commerceRepository: iRepository<Commerce>,
  commerceData: Commerce
): Promise<string> => {
  return await commerceRepository.create(commerceData);
};
