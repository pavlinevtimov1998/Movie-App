import { Schema, Types, model } from "mongoose";

import { IMovie } from "./interfaces";

const movieSchema = new Schema<IMovie>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "Movie name should be at least 5 characters!"],
      validate: {
        validator: function (value: string) {
          return /[A-Za-z]+/g.test(value);
        },
        message: () => "Movie name should contains only letters!",
      },
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /((https:\/\/|http:\/\/).+(\.jpg|\.png))/g.test(value);
        },
        message: () => "Movie image should be valid URL!",
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
    _ownerId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true } }
);

movieSchema.virtual("likes", {
  ref: "Like",
  foreignField: "movieId",
  localField: "_id",
});

export const Movie = model("Movie", movieSchema);
