import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global configuration
const Mongo_URI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to the database
mongoose.connect(Mongo_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

export default db;