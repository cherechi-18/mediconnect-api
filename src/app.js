import express from "express";
import cors from "cors" // connects frontend to backend
import helmet from "helmet"//add common http security headers
import morgan from "morgan"; // log incoming http requests

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "MediConnnect API is running" });
});

export default app;

