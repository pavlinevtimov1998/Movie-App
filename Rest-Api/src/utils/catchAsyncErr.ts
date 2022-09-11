import { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";
import { AppError } from "./appError";

export const catchAsyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: IError) => {
      if (err.name && err.name == "CastError") {
        return next(new AppError("Not Found!", 404));
      } else if (err.code == "11000") {
        const message = handleDuplicateError(err);

        return next(new AppError(message, 400));
      } else if (err.name == "ValidationError") {
        const message = handleValidationaError(err);

        return next(new AppError(message, 400));
      } else if (err.message == "Token expired!") {
        res.clearCookie(process.env.COOKIE_NAME as string);
        return next(new AppError("Invalid token! Please log in again!", 401));
      } else {
        return next(new AppError(err.message, 400));
      }
    });
  };
};

interface IError extends Error {
  code?: string;
  errmsg: string;
  errors: MongooseError;
}

const handleValidationaError = (err: IError) => {
  const errors: string[] = Object.values(err.errors).map((el) => el.message);

  return `Incorrect input. ${errors.join(". ")}`;
};

const handleDuplicateError = (err: IError) => {
  let matched = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  let value;

  if (matched) {
    value = matched[0];
  }

  return `Cannot duplicate this ${value}. Please try with different!`;
};
