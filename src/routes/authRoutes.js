import express from "express";
import { registerUser, loginUser,doctorDashboard,adminDashboard,getMe,forgotPassword,resetPassword} from "../controllers/authController.js";
import {authenticate} from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/doctor-dashboard",authenticate,authorize("doctor"),doctorDashboard);
router.get("/doctor-dashboard",authenticate,authorize("admin"),adminDashboard);
router.get("/me", authenticate, getMe);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);
export default router;