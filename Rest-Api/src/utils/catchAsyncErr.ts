import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

export const catchAsyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((err: Error) => {
      if (err.name && err.name == "CastError") {
        return next(new AppError("Not Found!", 404));
      }
    });
  };
};
