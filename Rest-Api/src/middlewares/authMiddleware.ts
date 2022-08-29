import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { cookieName, sercret } from "../config/constants";
import { jwtVerify } from "../utill";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    [cookieName]?: string;
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req[cookieName] || "";

  try {
    const decodedToken = (await jwtVerify(token, sercret)) as JwtPayload;

    if (decodedToken.id) {
      req.userId = decodedToken.id;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
