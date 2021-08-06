import { Request, Response } from "express";

export type Environment = "development" | "test" | "production";
export type ErrorType = "INFO" | "WARNING" | "ERROR" | "DEBUG";
export type ObjectType = { [key: string]: unknown };
export type emptyFunc = (args?: unknown) => void;

export interface iServerSettings {
    port: number;
    env: Environment;
}

export interface iServerContext {
    req: Request;  // TODO: Define appropriate type
    res: Response; // TODO: Define appropriate type
}

export interface iApplication {
    start(args: iServerSettings): void;
    context(args: iServerContext): iApplicationContext;
}

export interface iApplicationContext {
    token?: string;
    logger?: iLogger;
    pubSub?: emptyFunc;
    environment?: Environment;
}

export type iLoggerArgs = { type?: ErrorType, tag?: string; msg: string };
export interface iLogger {
    readonly env: Environment;
    log(args: iLoggerArgs): void;
}
