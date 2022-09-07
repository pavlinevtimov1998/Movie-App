import { Schema, Types, model } from "mongoose";

import { IAlbum } from "./interfaces";

const AlbumSchema = new Schema<IAlbum>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "Album name should be at least 5 characters!"],
      validate: {
        validator: function (value: string) {
          return /[A-Za-z]+/g.test(value);
        },
        message: () => "Album name should contains only letters!",
      },
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /((https:\/\/|http:\/\/).+(\.jpg|\.png))/g.test(value);
        },
        message: () => "Album image should be valid URL!",
      },
    },
    releaseDate: {
      type: String,
      trim: true,
      required: [true, "Release date is required!"],
      validate: {
        validator: function (value: string) {
          return /[A-Za-z0-9\.\/\\]+/g.test(value);
        },
        message: () => "Invalid date!",
      },
    },
    artist: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "Artist name should be at least 5 characters!"],
      validate: {
        validator: function (value: string) {
          return /[A-Za-z]+/g.test(value);
        },
        message: () => "Artist name should contains only letters!",
      },
    },
    genre: {
      type: String,
      trim: true,
      required: [true, "Genre is required!"],
      validate: {
        validator: function (value: string) {
          return /[A-Za-z]+/g.test(value);
        },
        message: () => "Genre should contains only letters!",
      },
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: [10, "Description should be at least 10 characters!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    _ownerId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true } }
);

AlbumSchema.virtual("likes", {
  ref: "Like",
  foreignField: "albumId",
  localField: "_id",
  count: true,
});

export const Album = model("Album", AlbumSchema);
