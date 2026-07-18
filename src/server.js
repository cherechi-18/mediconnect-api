import dotenv from "dotenv";
import dns from "node:dns/promises";
import app from "./app.js";
import connectDB from "./config/db.js";
dotenv.config();
console.log(process.env.MONGO_URI); // Log the MongoDB URI to verify it's loaded correctly
const PORT = process.env.PORT || 5000;
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Stop the application if the server fails to start
  }
};

startServer();
