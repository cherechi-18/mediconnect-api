import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/authorize.js";
import {createDoctorProfile,getDoctorProfile,updateDoctorProfile} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/profile",authenticate,authorize("doctor"),createDoctorProfile);
router.get("/profile",authenticate,authorize("doctor"),getDoctorProfile);
router.put("/profile",authenticate,authorize("doctor"),updateDoctorProfile);
export default router;