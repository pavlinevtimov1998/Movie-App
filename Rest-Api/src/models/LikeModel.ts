import { model, Schema, Types } from "mongoose";
import { ILike } from "./interfaces";

const LikeSchema = new Schema<ILike>({
  _ownerId: {
    type: Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: Types.ObjectId,
    ref: "Movie",
  },
});

export const Like = model("Like", LikeSchema);
