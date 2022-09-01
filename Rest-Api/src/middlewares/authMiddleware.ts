import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/interfaces";
import { User } from "../models/UserModel";
import { AppError } from "../utils/appError";
import { catchAsyncError } from "../utils/catchAsyncErr";
import { jwtVerify } from "../utils/utill";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser | null;
  }
}

export const authMiddleware = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies[process.env.COOKIE_NAME as string] || "";

    if (!token) {
      return next(new AppError("Token expired! Please log in!", 401));
    }

    const decodedToken = (await jwtVerify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    if (decodedToken.id) {
      req.user = await User.findById({ _id: decodedToken.id });
    }

    next();
  }
);
