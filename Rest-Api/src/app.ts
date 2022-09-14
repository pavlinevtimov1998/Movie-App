import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "./routes";
import { initializeDatabaze } from "./config/dbConfig";
import cors from "cors";

dotenv.config({ path: __dirname + "/config.env" });

const port = process.env.PORT || 3000;
const databaseUrl = process.env.DB_URL?.replace(
  "<PASSWORD>",
  process.env.DB_PASS || ""
);

const app = express();

app.use(
  cors({
    credentials: true,
    preflightContinue: true,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "HEAD", "OPTIONS"],
    origin: true,
    allowedHeaders: ["Content-Type", "Accept", "Origin", "X-Requested-With"],
    optionsSuccessStatus: 200,
  })
);
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
