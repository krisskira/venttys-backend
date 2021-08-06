import { ApolloServer } from "apollo-server-express";
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import app from "./app";
import {
    Environment,
    iApplication,
    iApplicationContext,
    iLogger,
    iServerContext,
    iServerSettings
} from "../interfaces/application.interface";

export class GraphQLApp implements iApplication {
    private _logger?: iLogger;
    private _app = app;
    private _env: Environment = 'production'
    private _server: ApolloServer<iServerContext>;

    constructor(logger?: iLogger) {
        this._logger = logger;
        this._app.set('logger', this._logger)
        this._server = new ApolloServer({ typeDefs, resolvers, context: this.context });
    }

    context(args: iServerContext): iApplicationContext {
        return {
            token: "Pending Token",
            logger: args.req.app.get('logger'),
            environment: this._env,
            pubSub: (_) => undefined
        };
    }

    async start(args: iServerSettings): Promise<void> {
        try {
            this._env = args.env
            await this._server.start();
            this._server.applyMiddleware({ app: this._app });
            this._app.listen({ port: args.port }, () => {
                this._logger?.log({
                    type: "INFO",
                    tag: `***-> Server settings (${args.env}):`,
                    msg: `
                        🚀 Server ready at http://localhost:${args.port}${this._server.graphqlPath}
                        🚀 Server ready at ws://localhost:${args.port}${this._server.graphqlPath}
                        🚀 Public dir at http://localhost:${args.port}/public
                    `,
                });
            })
        } catch (error) {
            this._logger?.log({
                type: "ERROR",
                tag: `***-> Error server start:`,
                msg: JSON.stringify(error)
            })
        }
    }
}
