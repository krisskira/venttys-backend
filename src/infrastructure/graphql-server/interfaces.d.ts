import { GraphQLResolveInfo } from "graphql";

import { iApplicationContext } from "../interfaces/application.interface";

export type iResolver<TArgs> = (
  parent: unknown,
  args: TArgs,
  context?: iApplicationContext,
  info?: GraphQLResolveInfo
) => unknown;
