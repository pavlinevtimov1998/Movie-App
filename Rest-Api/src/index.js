const express = require("express");


const { initializeDatabaze } = require("./config/dbConfig");
const cors = require('./middlewares/cors');

const app = express();

app.use(cors())

initializeDatabaze()
  .then(() => {
    app.listen(3030, () => console.log("Listening on port 3030..."));
  })
  .catch((err) => {
    console.error(err);
  });
