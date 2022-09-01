import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "./routes";
import { initializeDatabaze } from "./config/dbConfig";
import { cors } from "./middlewares/cors";
import { Server } from "http";

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

app.use(router);

initializeDatabaze(databaseUrl!).then(() => {
  console.log("DB connection is successfull!");
});

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name + ", " + err.message);

  console.error("Unhandled Rejection! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
