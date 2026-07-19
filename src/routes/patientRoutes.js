import express from "express";
import {authenticate} from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/authorize.js";
import { createPatientProfile } from "../controllers/patientController.js";

const router = express.Router();
router.post("/profile",authenticate,authorize("patient"),createPatientProfile);
export default router;