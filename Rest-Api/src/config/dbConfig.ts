import mongoose from "mongoose";

const databaseUrl = "mongodb://localhost:27017/MusicApp";

export const initializeDatabaze = () => mongoose.connect(databaseUrl);