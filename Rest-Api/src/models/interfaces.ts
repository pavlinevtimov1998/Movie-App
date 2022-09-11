import { Types } from "mongoose";

export interface IUser {
  _id:
    | {
        type: Types.ObjectId;
        ref: string;
      }
    | string;
  username: string;
  email: string;
  password: string;
}

export interface IMovie {
  _id?: string;
  name: string;
  imageUrl: string;
  genre: string;
  description: string;
  _ownerId:
    | {
        type: Types.ObjectId;
        ref: string;
      }
    | string;
  likes?: {
    type: Types.ObjectId;
    ref: string;
  }[];
}

export interface ILike {
  _ownerId: {
    type: Types.ObjectId;
    ref: string;
  };
  movieId: {
    type: Types.ObjectId;
    ref: string;
  };
}
