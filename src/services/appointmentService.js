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
// Prevent Booking in the Past
  const noPastBooking = new Date(appointmentDate);

if (noPastBooking < new Date()) {throw new Error("You cannot book an appointment in the past.")}
const existingAppointment = await Appointment.findOne({
  doctor: doctor._id,
  appointmentDate,
  status: {$in: ["pending", "accepted"]}
});
// Prevent Double Booking
if (existingAppointment) {
  throw new Error("The doctor already has an appointment at the selected date and time.");
}
//Extract day and time
const appointment = new Date(appointmentDate);

const dayOfWeek = appointment.toLocaleDateString("en-US", {
  weekday: "long",
});

const appointmentTime = appointment.toTimeString().slice(0, 5); 

// Check if the doctor works on the selected day
if (!doctor.availability.days.includes(dayOfWeek)) {throw new Error("The doctor is not available on this day.")}

// Check if the appointment time is within working hours
if (appointmentTime < doctor.availability.startTime ||appointmentTime > doctor.availability.endTime)
     {throw new Error("The appointment time is outside the doctor's working hours.")}

  // Create the appointment
  const appointmentRecord = await Appointment.create({
    patient: patient._id,
    doctor: doctor._id,
    appointmentDate,
    reason,
  });
  return appointmentRecord;
};


export const getMyAppointmentsService = async (userId) => {
  const patient = await PatientProfile.findOne({user: userId});

  if (!patient) {throw new Error("Patient profile not found.")}

  const appointments = await Appointment.find({patient: patient._id,}).populate("doctor").sort({ appointmentDate: 1 });
  
  return appointments;
};

export const getDoctorAppointmentsService = async (userId) => {
  const doctor = await DoctorProfile.findOne({user: userId});

  if (!doctor) {throw new Error("Doctor profile not found.")}

  const appointments = await Appointment.find({doctor: doctor._id}).populate("patient").sort({ appointmentDate: 1 });

  return appointments;
};

export const updateAppointmentStatusService = async (
  userId,
  appointmentId,
  status
) => {
  // Find the logged-in doctor's profile
  const doctor = await DoctorProfile.findOne({
    user: userId,
  });

  if (!doctor) {
    throw new Error("Doctor profile not found.");
  }

  // Find the appointment
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {throw new Error("Appointment not found.")}

  // Ensure the appointment belongs to this doctor
  if (appointment.doctor.toString() !== doctor._id.toString()) {
    throw new Error("You are not authorized to update this appointment.");
  }

  // Update the status
  appointment.status = status;

  await appointment.save();

  return appointment;
};

export const cancelAppointmentService = async (userId, appointmentId) => {

  const patient = await PatientProfile.findOne({user: userId});

  if (!patient) {throw new Error("Patient profile not found.")}

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {throw new Error("Appointment not found.")}

  if (appointment.patient.toString() !== patient._id.toString()) {
    throw new Error("You are not authorized to cancel this appointment.")
  }

  if (appointment.status === "cancelled") {throw new Error("Appointment has already been cancelled.")}

  if (appointment.status === "completed") {throw new Error("Completed appointments cannot be cancelled.")}

  appointment.status = "cancelled";

  await appointment.save();

  return appointment;
};
export const rescheduleAppointmentService = async (
  userId,
  appointmentId,
  appointmentDate
) => {

  const patient = await PatientProfile.findOne({user: userId});

  if (!patient) {throw new Error("Patient profile not found.")}

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {throw new Error("Appointment not found.")}

  if (appointment.patient.toString() !== patient._id.toString()) {
    throw new Error("You are not authorized to reschedule this appointment.")
}

  if (appointment.status === "completed" ||appointment.status === "cancelled")
  {throw new Error("This appointment cannot be rescheduled.")}

  const doctor = await DoctorProfile.findById(appointment.doctor);
//Prevent Pastbooking while rescheduling
  const newAppointmentDate = new Date(appointmentDate);

if (newAppointmentDate < new Date()) {
 throw new Error("You cannot reschedule an appointment to the past.")
}

const dayOfWeek = newAppointmentDate.toLocaleDateString("en-US", {
  weekday: "long",
});

const appointmentTime = newAppointmentDate.toTimeString().slice(0, 5);

if (!doctor.availability.days.includes(dayOfWeek)) {
  throw new Error("The doctor is not available on this day.");
}

if (
  appointmentTime < doctor.availability.startTime ||appointmentTime > doctor.availability.endTime
) {
  throw new Error("The appointment time is outside the doctor's working hours.");
}
// Prevent double booking while rescheduling
const existingAppointment = await Appointment.findOne({
  _id: { $ne: appointmentId }, // not equal to : so mongodb does not find the same appointment and throw an error
  doctor: doctor._id,
  appointmentDate,
  status: {
    $in: ["pending", "accepted"],
  },
});

if (existingAppointment) {
  throw new Error("The doctor already has another appointment at the selected date and time.");
}

  appointment.appointmentDate = appointmentDate;

  appointment.status = "pending";

  await appointment.save();

  return appointment;
};

export const filterAppointmentsByStatusService = async (userId,role,status) => {
 let filter = { status };
if (role === "patient") {const patient = await PatientProfile.findOne({ user: userId });
filter.patient = patient._id;
  }

  if (role === "doctor") {const doctor = await DoctorProfile.findOne({ user: userId });
    filter.doctor = doctor._id;
  }

  const appointments = await Appointment.find(filter).populate("patient").populate("doctor").sort({ appointmentDate: 1 });

  return appointments;
};

export const filterAppointmentsByDateService = async (userId,role,appointmentDate) => {
let filter = { appointmentDate };

  if (role === "patient") {const patient = await PatientProfile.findOne({ user: userId });
    filter.patient = patient._id;
  }

  if (role === "doctor") {const doctor = await DoctorProfile.findOne({ user: userId });
    filter.doctor = doctor._id;
  }

  return await Appointment.find(filter).populate("patient").populate("doctor").sort({ appointmentDate: 1 });
};

export const filterAppointmentsByDoctorService = async (doctorId) => {
  return await Appointment.find({doctor: doctorId}).populate("patient").populate("doctor").sort({ appointmentDate: 1 })
};

export const filterAppointmentsByPatientService = async (patientId) => {
  const appointments = await Appointment.find({patient: patientId}).populate("patient").populate("doctor").sort({ appointmentDate: 1 });
    return appointments
};
