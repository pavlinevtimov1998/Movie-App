import { NextFunction, Request, Response } from "express";

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, HEAD, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  next();
};
