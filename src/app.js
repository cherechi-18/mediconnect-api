import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import {apiLimiter} from "./middleware/rateLimiter.js";
import cors from "cors"; // connects frontend to backend
import helmet from "helmet"; //add common http security headers
import morgan from "morgan"; // log incoming http requests
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js";
const app = express();

app.set("trust proxy", 1); //Trust the first proxy in front of this application.

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(apiLimiter);

//Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get("/", (req, res) => {res.status(200).json({ message: "MediConnnect API is running" })});
app.use("/api/auth", authRoutes); // Mount the authRoutes at /api/auth
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
export default app;
