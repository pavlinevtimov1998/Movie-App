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
  price: number;
  releaseDate: string;
  artist: string;
  genre: string;
  description: string;
  ratingsAverage: number;
  ratingsQuantity: number;
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
