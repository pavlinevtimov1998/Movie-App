import jwt, { JwtPayload } from "jsonwebtoken";
import { IAlbum, IUser } from "./models/interfaces";

export const removePassword = (
  data: IUser
): { email: string; username: string; id?: string } => {
  const { password, __v, ...user } = data;

  return user;
};

export const parseDocument = (data: any) => JSON.parse(JSON.stringify(data));

export const jwtPromise = (id: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

export const jwtVerify = (
  token: string,
  secret: string
): Promise<JwtPayload | string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

export const getQuery = (queryObj: any) => {
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((field) => delete queryObj[field]);

  return JSON.parse(
    JSON.stringify(queryObj).replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    )
  );
};
