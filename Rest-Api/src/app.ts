import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes";
import { initializeDatabaze } from "./config/dbConfig";
import { cors } from "./middlewares/cors";

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());

initializeDatabaze()
  .then(() => {
    app.use(router);

    app.listen(3030, () => console.log("Listening on port 3030..."));
  })
  .catch((err) => {
    console.error(err);
  });
