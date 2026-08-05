import dotenv from "dotenv"; dotenv.config();
import dns from "node:dns/promises";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`MediConnect API is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Stop the application if the server fails to start
  }
};

startServer();
