export enum PubSubChannel {
  whatsappReconnect = "SUBSC:TOPIC:WA:RECONNECT",
  whatsappStatus = "SUBSC:TOPIC:WA:STATUS",
  whatsappOnQR = "SUBSC:TOPIC:WA:QRREGEN",
}
// TODO: Pending by define the differents notifications types
export type NotificationType = "QRREGEN" | "NEW_ORDER";

export type Notification<Tpayload> = {
  type: NotificationType;
  data: Tpayload;
};

export type PubSubPayload<Tpayload> = {
  [subscritionName: string]: Notification<Tpayload>;
};

export interface iPubSub {
  publish(channel: PubSubChannel, payload: PubSubPayload);
}
