const router = require("express").Router();
const bcrypt = require("bcrypt");

// TODO: Add better validation!

const User = require("../models/UserModel");
const { removePassword, parseDocument } = require("../utill");

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    let userData = parseDocument(user);
    userData = removePassword(userData);

    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    const auth = await bcrypt.compare(password, user.password);

    console.log(auth);
    if (!auth) {
      return res.status(404).json({ message: "wrong username or password!" });
    }

    let userData = parseDocument(user);
    userData = removePassword(userData);

    res.status(200).json(userData);
  } catch (err) {}
};

exports.exports = router;
