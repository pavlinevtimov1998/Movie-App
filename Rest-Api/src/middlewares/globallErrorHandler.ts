import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    message: err.message,
  });
};
