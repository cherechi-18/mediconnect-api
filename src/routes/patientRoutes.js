import express from "express";
import {authenticate} from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/authorize.js";
import { createPatientProfile,getPatientProfile,updatePatientProfile } from "../controllers/patientController.js";

const router = express.Router();
router.post("/profile",authenticate,authorize("patient"),createPatientProfile);
router.get("/profile",authenticate,authorize("patient"),getPatientProfile);
router.put("/profile",authenticate,authorize("patient"),updatePatientProfile);

export default router;