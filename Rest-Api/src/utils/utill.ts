import jwt, { JwtPayload } from "jsonwebtoken";
import { Document, Query, Types } from "mongoose";

import { IAlbum, IUser } from "../models/interfaces";
import { AppError } from "./appError";

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
        return reject(new AppError("Token expired!", 401));
      }
      resolve(payload);
    });
  });
};

export class Sorting {
  constructor(
    public query: Query<
      (Document<unknown, any, IAlbum> &
        IAlbum & {
          _id: Types.ObjectId;
        })[],
      Document<unknown, any, IAlbum> &
        IAlbum & {
          _id: Types.ObjectId;
        },
      {},
      IAlbum
    >,
    public queryParams: { [key: string]: string }
  ) {}

  filter() {
    let queryObj = { ...this.queryParams };

    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lt|lte)\b/g,
        (match) => `$${match}`
      )
    );

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const query = this.queryParams.sort as string;

      const sortBy = query.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  fields() {
    if (this.queryParams.fields) {
      let fields = this.queryParams.fields as string;
      fields = fields.split(",").join(" ");

      this.query = this.query.select(fields + " -__v -updatedAt");
    } else {
      this.query = this.query.select("-__v -updatedAt");
    }

    return this;
  }
}
