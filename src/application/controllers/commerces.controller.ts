import { CommerceRepository } from "../../application/repository/commerce.reposirory";
import {
  createCommerceUserCase,
  deactivateCommerceUserCase,
  enrollUsersAtCommerceUserCase,
  getCommerceByPhoneNumberUserCase,
  getCommercesListUserCase,
  //   getUsersByCommerceUserCase,
  removeUserOfCommerceUserCase,
  updateCommerceUserCase,
} from "../../application/user-cases/commerce";
import { Controller, OperationStatus } from "../../domain";
import { Commerce } from "../../domain/commerce.interface";
import { CommerceUser } from "../../domain/commerceUser.interface";

export const getCommercesController: Controller<
  void,
  Promise<Commerce[]>
> = async (): Promise<Commerce[]> => {
  const repository = new CommerceRepository();
  return await getCommercesListUserCase(repository);
};

export const getCommerceByPhoneNumberController: Controller<
  string,
  Promise<Commerce[]>
> = async (commercePhoneNumber): Promise<Commerce[]> => {
  const repository = new CommerceRepository();
  return await getCommerceByPhoneNumberUserCase(
    repository,
    commercePhoneNumber!
  );
};

export const createCommerceController: Controller<
  Commerce,
  Promise<string>
> = async (commerceInfo): Promise<string> => {
  const repository = new CommerceRepository();
  return await createCommerceUserCase(repository, commerceInfo!);
};

/**
 *
 *
 *      !!TODO: Pending by implementations...
 *
 *
 */

export const updateCommerceController: Controller<
  Partial<Commerce>,
  Promise<OperationStatus>
> = async (commerceInfo): Promise<OperationStatus> => {
  return await updateCommerceUserCase();
};

export const deactivateCommerceController: Controller<
  string,
  Promise<OperationStatus>
> = async (commercePhoneNumber): Promise<OperationStatus> => {
  return await deactivateCommerceUserCase();
};

export const getUsersByCommerceController: Controller<
  string,
  Promise<CommerceUser[]>
> = async (commercePhoneNumber): Promise<CommerceUser[]> => {
  // const commerceRepository = new CommmerceRepository()
  // const userRepository = new UserRepository()
  // return await getUsersByCommerceUserCase(commerceRepository, userRepository, commercePhoneNumber)
  throw "Not implement yet";
};

export const enrollUsersAtCommerceController: Controller<
  CommerceUser,
  Promise<string>
> = async (userinfo): Promise<string> => {
  return await enrollUsersAtCommerceUserCase();
};

export const removeUserOfCommerceController: Controller<
  string,
  Promise<OperationStatus>
> = async (userEmail): Promise<OperationStatus> => {
  return await removeUserOfCommerceUserCase();
};
