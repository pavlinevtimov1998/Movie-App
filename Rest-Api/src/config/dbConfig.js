const mongoose = require("mongoose");

const databaseUrl = "mongodb://localhost:27017/MusicApp";

exports.initializeDatabaze = () =>
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
