import { ErrorCodes, OperationStatus } from "../../../domain";
import { Commerce } from "../../../domain/commerce.interface";
import { CommerceRepository } from "../../repository";

export const updateCommerceUserCase = async (
  data: Partial<Commerce>,
  commerceRepository: CommerceRepository
): Promise<OperationStatus> => {
  data;
  commerceRepository;
  return new Promise<OperationStatus>(() => {
    throw ErrorCodes.noImplementYet;
  });
};
