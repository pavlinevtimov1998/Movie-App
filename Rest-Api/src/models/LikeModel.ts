import { model, Schema, Types } from "mongoose";
import { ILike } from "./interfaces";

const LikeSchema = new Schema<ILike>({
  _ownerId: {
    type: Types.ObjectId,
    ref: "User",
  },
  album: {
    type: Types.ObjectId,
    ref: "Album",
  },
});

export const Like = model("Like", LikeSchema);
