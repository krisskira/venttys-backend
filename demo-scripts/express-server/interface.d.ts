import { NextFunction, Request, Response } from "express";

export type iRequest = (
  req: Request,
  res: Response,
  next?: NextFunction
) => unknown;
