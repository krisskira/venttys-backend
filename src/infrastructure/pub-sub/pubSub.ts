import { PubSub } from "graphql-subscriptions";

import { iPubSub, PubSubChannel, PubSubPayload } from "../interfaces";

export class PubSubHandler implements iPubSub {
  private readonly _pubsub = new PubSub();
  publish(
    channel: PubSubChannel,
    payload: PubSubPayload<Record<string, unknown>>
  ): void {
    this._pubsub.publish(channel, payload);
  }
}
