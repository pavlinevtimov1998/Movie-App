import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "./routes";
import { initializeDatabaze } from "./config/dbConfig";
import { cors } from "./middlewares/cors";

dotenv.config({ path: __dirname + "/config.env" });

const port = process.env.PORT || 3000;
const databaseUrl = process.env.DB_URL?.replace(
  "<PASSWORD>",
  process.env.DB_PASS || ""
);

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());

initializeDatabaze(databaseUrl!)
  .then(() => {
    app.use(router);

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.error(err);
  });
