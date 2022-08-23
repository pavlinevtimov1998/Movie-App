const bcrypt = require("bcrypt");
const { sercret } = require("../config/constants");

const User = require("../models/UserModel");
const { removePassword, parseDocument, jwtPromise } = require("../utill");

exports.register = async (data) => {
  const user = await User.create(data);
  console.log(user);

  let userData = parseDocument(user);
  userData = removePassword(userData);

  console.log(userData);

  const token = await jwtPromise(userData._id, sercret);

  return { userData, token };
};

exports.login = async (data) => {
  const user = await User.findOne({ username: data.username });

  if (!user) {
    throw {
      message: "Invalid username or password!",
    };
  }

  const isValid = await bcrypt.compare(data.password, data.password);

  if (!isValid) {
    throw {
      message: "Invalid username or password!",
    };
  }

  let userData = parseDocument(user);
  userData = removePassword(userData);

  const token = await jwtPromise(user._id, sercret);

  return { userData, token };
};
