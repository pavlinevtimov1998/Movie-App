import { NextFunction, Request, Response, Router } from "express";

const router = Router();

import albumController from "./constrollers/albumController";
import authController from "./constrollers/authController";
import { globalErrorHandler } from "./middlewares/globallErrorHandler";
import { AppError } from "./utils/appError";

router.use("/users", authController);

router.use("/data", albumController);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can\'t find ${req.originalUrl} on this server!`, 404));
});

router.use(globalErrorHandler);

export default router;
