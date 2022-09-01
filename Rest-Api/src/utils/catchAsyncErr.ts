import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

export const catchAsyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: IError) => {
      if (err.name && err.name == "CastError") {
        return next(new AppError("Not Found!", 404));
      } else if (err.code == "11000") {
        let matched = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
        let value;

        if (matched) {
          value = matched[0];
        }

        const message = `Cannot duplicate this ${value}. Please try with different!`;

        return next(new AppError(message, 400));
      } else {
        return next(new AppError(err.message, 400));
      }
    });
  };
};

interface IError extends Error {
  code?: string;
  errmsg: string;
}
