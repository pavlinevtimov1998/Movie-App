import { NextFunction, Request, Response, Router } from "express";

import albumController from "./constrollers/albumController";
import authController from "./constrollers/authController";
import likeController from "./constrollers/likeController";

import { authMiddleware } from "./middlewares/authMiddleware";
import { globalErrorHandler } from "./middlewares/globallErrorHandler";
import { AppError } from "./utils/appError";

const router = Router();

router.use("/users", authController);

router.use("/data", albumController);

router.use("/likes", authMiddleware, likeController);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can\'t find ${req.originalUrl} on this server!`, 404));
});

router.use(globalErrorHandler);

export default router;
