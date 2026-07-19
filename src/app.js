import express from "express";
import cors from "cors"; // connects frontend to backend
import helmet from "helmet"; //add common http security headers
import morgan from "morgan"; // log incoming http requests
import router from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"
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
app.use("/api/auth", authRoutes); // Mount the authRoutes at /api/auth
app.use("/api/patients", patientRoutes)

export default app;
