import { NextFunction, Request, Response, Router } from "express";

import movieController from "./constrollers/MovieController";
import authController from "./constrollers/authController";

import { globalErrorHandler } from "./middlewares/globallErrorHandler";
import { AppError } from "./utils/appError";
import likeController from "./constrollers/likeController";
import { authMiddleware } from "./middlewares/authMiddleware";

const router = Router();

router.use("/users", authController);

router.use("/data", movieController);

router.use("/likes", likeController);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can\'t find ${req.originalUrl} on this server!`, 404));
});

router.use(globalErrorHandler);

export default router;
