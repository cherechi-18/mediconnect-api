import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/authorize.js";
import {bookAppointment,getMyAppointments,getDoctorAppointments,updateAppointmentStatus,cancelAppointment} from "../controllers/appointmentController.js";
import {rescheduleAppointment,filterAppointmentsByStatus,filterAppointmentsByDate,filterAppointmentsByDoctor,filterAppointmentsByPatient} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/",authenticate,authorize("patient"),bookAppointment);
router.get("/my",authenticate,authorize("patient"),getMyAppointments);
router.get("/doctor",authenticate,authorize("doctor"),getDoctorAppointments);
router.patch("/:id/status",authenticate,authorize("doctor"),updateAppointmentStatus);
router.patch("/:id/cancel",authenticate,authorize("patient"),cancelAppointment);
router.patch("/:id/reschedule",authenticate,authorize("patient"),rescheduleAppointment);
router.get("/status/:status",authenticate,authorize("patient", "doctor"),filterAppointmentsByStatus);
router.get("/date/:date",authenticate,authorize("patient", "doctor"),filterAppointmentsByDate);
router.get("/doctor/:doctorId",authenticate,authorize("admin"),filterAppointmentsByDoctor);
router.get("/patient/:patientId",authenticate,authorize("admin"),filterAppointmentsByPatient);
export default router;