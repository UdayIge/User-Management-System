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

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app;
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
