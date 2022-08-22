const express = require("express");
const { initializeDatabaze } = require("./config/dbConfig");

const app = express();

initializeDatabaze()
  .then(() => {
    app.listen(3030, () => console.log("Listening on port 3030..."));
  })
  .catch((err) => {
    console.error(err);
  });
