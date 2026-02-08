require("dotenv").config();
const app = require("../src/app");
const connectDatabase = require("../src/config/database");

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await connectDatabase();
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

connectToDatabase();

module.exports = app;
