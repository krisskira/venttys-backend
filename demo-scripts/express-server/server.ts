import express, { Express } from "express";
import path from "path";
import { iProcessHandler } from "../../src/infrastructure/interfaces/processHandler.interface";

import {
  Environment,
  iApplication,
  iApplicationContext,
  iLogger,
  iServerContext,
  iServerSettings,
} from "../../src/infrastructure/interfaces";
import { pingRouter } from "./routes";

export class ServerRestApp implements iApplication {
  private _app: Express;
  private readonly _logger?: iLogger;
  private _processHandler?: iProcessHandler;
  private _env: Environment = "production";
  private readonly _API_VERSION = "/api/v1";

  constructor(logger?: iLogger, processHandler?: iProcessHandler) {
    this._logger = logger;
    this._processHandler = processHandler;
    const staticPath = path.join(__dirname, "../../../public");
    const staticSettings = express.static(staticPath, { maxAge: 31557600000 });

    this._app = express();
    this._app.use(express.json());

    this._app.use((req, res, next) => {
      const context = this.context({ req, res });
      this._app.set("context", context);
      next();
    });

    this._app.use("/public", staticSettings);
    this._app.use(this._API_VERSION, pingRouter);
  }

  start(args: iServerSettings): void {
    this._env = args.env;
    this._app.listen(args.port, () => {
      this._logger?.log({
        type: "INFO",
        tag: `***-> Server settings (${this._env}):`,
        msg: `
                    🚀 Server ready at http://localhost:${args.port}${this._API_VERSION}/
                    🚀 Public dir at http://localhost:${args.port}/public
                `,
      });
    });
  }

  context(args: iServerContext): iApplicationContext {
    return {
      token: "Pending Token",
      logger: this._logger,
      environment: this._env,
      pubSub: (_) => undefined,
    };
  }
}
