import mongoose from "mongoose";

export const initializeDatabaze = (databaseUrl: string) =>
  mongoose.connect(databaseUrl);
