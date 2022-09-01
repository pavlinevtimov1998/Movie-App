import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

export const catchAsyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      if (err.name && err.name == "CastError") {
        return next(new AppError("Not Found!", 404));
      } else {
        return next(new AppError(err.message, 400));
      }

    });
  };
};
