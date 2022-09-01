import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "../utils/utill";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const token: string = req.cookies[process.env.COOKIE_NAME as string] || "";

  try {
    const decodedToken = (await jwtVerify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    if (decodedToken.id) {
      req.userId = decodedToken.id;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
