import { join } from "path";
import { createLogger, format, Logger, transports } from "winston";

import { Environment, iLogger, iLoggerArgs } from "../interfaces";

export class WistonLogger implements iLogger {
  env: Environment;
  private _logger: Logger;

  constructor(env: Environment) {
    this.env = env;
    const transporOptionBuilder = (level: string) => {
      return {
        zippedArchive: true,
        dirname: join(__dirname, "../../../logs"),
        filename: level + ".log",
        level: level,
        maxsize: 5 * 1024 * 1024,
        maxFiles: 5,
      };
    };
    this._logger = createLogger({
      level: "debug",
      format: format.combine(format.json(), format.timestamp()),
      defaultMeta: { service: "venttys-graphql-api" },
      transports: [
        new transports.File(transporOptionBuilder("info")),
        new transports.File(transporOptionBuilder("warn")),
        new transports.File(transporOptionBuilder("error")),
      ],
    });

    if (env !== "production") {
      this._logger.add(
        new transports.Console({
          level: "debug",
          format: format.combine(format.colorize(), format.simple()),
        })
      );
    }
  }

  log(args: iLoggerArgs): void {
    switch (args.type) {
      case "DEBUG":
        this._logger.log({
          level: "debug",
          message: args.msg,
          additional: args.tag,
        });
        break;
      case "INFO":
        this._logger.log({
          level: "info",
          message: args.msg,
          additional: args.tag,
        });
        break;
      case "WARNING":
        this._logger.log({
          level: "warn",
          message: args.msg,
          additional: args.tag,
        });
        break;
      case "ERROR":
        this._logger.log({
          level: "error",
          message: args.msg,
          additional: args.tag,
        });
        break;
    }
  }
}
