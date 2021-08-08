import { FilterFn, ResolverFn, withFilter } from "graphql-subscriptions";

import {
  whatsAppHandlerCloseController,
  whatsAppHandlerReconectController,
  whatsAppHandlerStartSessionController,
  whatsAppHandlerStatusController,
} from "../../../../application/controllers/whatsAppHandler.controller";
import { CommerceBasicInfo } from "../../../../domain/commerce.interface";
import { Notification } from "../../../interfaces/pubSub.interface";
import { iResolver } from "../../interfaces";

const initWhatsAppListener: iResolver<{ commerceInfo: CommerceBasicInfo }> =
  async (_, { commerceInfo }, context, __) => {
    return await whatsAppHandlerStartSessionController(commerceInfo, context);
  };

const getWhatsAppStatus: iResolver<{ phoneNumber: string }> = async (
  _,
  { phoneNumber: commercePhoneNumber },
  context,
  __
) => {
  return await whatsAppHandlerStatusController(commercePhoneNumber, context);
};

const whatsAppReconnect: iResolver<{ commerceInfo: CommerceBasicInfo }> =
  async (_, { commerceInfo }, context, __) => {
    return await whatsAppHandlerReconectController(commerceInfo, context);
  };

const stopWhatsAppListener: iResolver<{ phoneNumber: string }> = async (
  _,
  { phoneNumber: commercePhoneNumber },
  context,
  __
) => {
  return await whatsAppHandlerCloseController(commercePhoneNumber, context);
};

const subscWhatsappEvents: iResolver<Notification<unknown>> = (
  _,
  __,
  context,
  ___
) => {
  return context!.pubSub.asyncIterator(["onWhatsAppEvent"]);
};

const subscFilterFunc: iResolver<{ token: string }> = (
  _,
  { token = "empty" },
  _context,
  __
) => {
  _context?.logger?.log({
    type: "DEBUG",
    tag: "***-> Token: ",
    msg: token,
  });
  return true;
};

const onWhatsAppEvent = {
  subscribe: withFilter(
    subscWhatsappEvents as ResolverFn,
    subscFilterFunc as FilterFn
  ),
};

module.exports = {
  Query: {
    getWhatsAppStatus,
  },
  Mutation: {
    initWhatsAppListener,
    whatsAppReconnect,
    stopWhatsAppListener,
  },
  Subscription: {
    onWhatsAppEvent,
  },
};
