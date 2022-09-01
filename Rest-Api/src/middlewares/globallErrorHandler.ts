import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    sendDevErr(res, err);
  } else if (process.env.NODE_ENV == "production") {
    sendProdErr(res, err);
  }
};

const sendDevErr = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdErr = (res: Response, err: AppError) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);

    res.status(500).json({
      status: "Server error!",
      message: "Something went wrong!",
    });
  }
};
