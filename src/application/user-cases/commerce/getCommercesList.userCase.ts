import { iRepository } from "../../../application/repository";
import { Commerce } from "../../../domain";

export const getCommercesListUserCase = async (
  commerceRepository: iRepository<Commerce>
): Promise<Commerce[]> => {
  return commerceRepository.get();
};
