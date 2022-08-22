const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [6, "Username should be at least 6 characters!"],
    valitate: {
      validator: (value) => {
        return /[a-zA-Z0-9_-]+/g.test(value);
      },
      message: (props) =>
        `${props.value} must contains only letters, digits, underline and dash!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    valitate: {
      validator: (value) => {
        return /[a-zA-Z0-9]{6,}@[a-zA-Z]+\.[a-z]+/g.test(value);
      },
      message: () => "Invalid email!",
    },
  },
  password: {
    type: String,
    reuqired: true,
    minLength: [6, "Password should be at least 6 characters"],
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

module.exports = mongoose.model("User", UserSchema);
