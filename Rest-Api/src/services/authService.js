const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");
const { removePassword, parseDocument } = require("../utill");

exports.register = async (data) => {
    
  const user = await User.create(data);

  let userData = parseDocument(user);
  userData = removePassword(userData);

  return userData;
};
