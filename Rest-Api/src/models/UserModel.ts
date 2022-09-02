import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "./interfaces";

const saltRounds = 10;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required!"],
    unique: true,
    minLength: [6, "Username should be at least 6 characters!"],
    validate: {
      validator: (value: string) => {
        return /[a-zA-Z0-9_-]+/g.test(value);
      },
      message: (props) =>
        `${props.value} must contains only letters, digits, underline and dash!`,
    },
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required!"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /[a-zA-Z0-9]{6,}@[a-zA-Z]+\.[a-z]+/g.test(value);
      },
      message: () => "Invalid email!",
    },
  },
  password: {
    type: String,
    trim: true,
    reuqired: [true, "Password is required!"],
    minLength: [6, "Password should be at least 6 characters"],
    select: false,
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

export const User = model("User", UserSchema);
