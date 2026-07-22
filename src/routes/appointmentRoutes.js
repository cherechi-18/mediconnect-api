import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/authorize.js";
import {bookAppointment,getMyAppointments} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/",authenticate,authorize("patient"),bookAppointment);
router.get("/my",authenticate,authorize("patient"),getMyAppointments);
export default router;