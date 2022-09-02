import { Types } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

export interface IAlbum {
  name: string;
  imageUrl: string;
  price: number;
  releaseDate: string;
  artist: string;
  genre: string;
  description: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  _ownerId: {
    type: Types.ObjectId;
    ref: string;
  };
  likes?: number;
}

export interface ILike {
  _ownerId: {
    type: Types.ObjectId;
    ref: string;
  };
  album: {
    type: Types.ObjectId;
    ref: string;
  };
}
