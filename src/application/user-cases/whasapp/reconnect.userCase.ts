import { CommerceBasicInfo } from "../../../domain/commerce.interface";
import { iProcessHandler } from "../../../infrastructure/interfaces/processHandler.interface";

export const whatsAppReconnectUserCase = async (
  processHandler: iProcessHandler,
  commerceInfo: CommerceBasicInfo
): Promise<void> => {
  await processHandler.sendMessage({
    code: commerceInfo.phoneNumber,
    data: {
      commercePhoneNumber: commerceInfo.phoneNumber,
      commerceName: commerceInfo.name,
    },
  });
};
