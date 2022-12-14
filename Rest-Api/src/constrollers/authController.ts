import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";

import { IUser } from "../models/interfaces";
import { User } from "../models/UserModel";
import { jwtPromise } from "../utils/utill";
import { authMiddleware } from "../middlewares/authMiddleware";
import { catchAsyncError } from "../utils/catchAsyncErr";
import { AppError } from "../utils/appError";

const router = Router();

router.post(
  "/register",
  catchAsyncError(async (req: Request, res: Response) => {
    const { email, username, password } = req.body as IUser;

    const user = await User.create({
      email,
      username,
      password,
    });

    const token = await jwtPromise(
      user._id.toString(),
      process.env.JWT_SECRET as string
    );

    res.cookie(process.env.COOKIE_NAME as string, token, {
      httpOnly: true,
    });

    res.status(201).json({
      status: "Success",
      user: { username: user.username, email: user.email, _id: user._id },
    });
  })
);

router.post(
  "/login",
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as IUser;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new AppError("Invalid username or password!", 401));
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return next(new AppError("Invalid username or password!", 401));
    }

    const token = await jwtPromise(
      user._id.toString(),
      process.env.JWT_SECRET as string
    );

    res.cookie(process.env.COOKIE_NAME as string, token, { httpOnly: true });

    res.status(200).json({
      status: "Success",
      user: { username: user.username, email: user.email, _id: user._id },
    });
  })
);

router.get(
  "/logout",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("Can't find user!", 404));
    }

    res.clearCookie(process.env.COOKIE_NAME as string);

    res.status(200).json({
      status: "Success",
    });
  })
);

router.get(
  "/profile",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("Can't find user!", 404));
    }

    res.status(200).json({
      status: "Success",
      user: { username: user.username, email: user.email, _id: user._id },
    });
  })
);

router.patch(
  "/edit/:userId",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const data = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: data.username,
        email: data.email,
      },
      { new: true }
    );

    res.status(201).json({ status: "Successfull!", user });
  })
);

export default router;
