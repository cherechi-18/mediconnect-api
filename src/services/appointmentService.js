import Appointment from "../models/Appointment.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";

export const bookAppointmentService = async (
  userId,
  doctorId,
  appointmentDate,
  reason
) => {
  // Find the logged-in patient's profile
  const patient = await PatientProfile.findOne({user: userId});

  if (!patient) {
    throw new Error("Patient profile not found.");
  }

  // Find the doctor's profile
  const doctor = await DoctorProfile.findById(doctorId);

  if (!doctor) {
    throw new Error("Doctor profile not found.");
  }

  // Create the appointment
  const appointment = await Appointment.create({
    patient: patient._id,
    doctor: doctor._id,
    appointmentDate,
    reason,
  });

  return appointment;
};


export const getMyAppointmentsService = async (userId) => {
  const patient = await PatientProfile.findOne({user: userId});

  if (!patient) {throw new Error("Patient profile not found.")}

  const appointments = await Appointment.find({patient: patient._id,}).populate("doctor").sort({ appointmentDate: 1 });
  
  return appointments;
};