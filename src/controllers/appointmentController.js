import { bookAppointmentService,getMyAppointmentsService,getDoctorAppointmentsService,updateAppointmentStatusService,cancelAppointmentService} from "../services/appointmentService.js";
import {rescheduleAppointmentService,filterAppointmentsByStatusService,filterAppointmentsByDateService,filterAppointmentsByDoctorService,filterAppointmentsByPatientService} from "../services/appointmentService.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, reason } = req.body;

    const appointment = await bookAppointmentService(
      req.user.id,
      doctorId,
      appointmentDate,
      reason
    );

    return res.status(201).json({message: "Appointment booked successfully.",appointment});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await getMyAppointmentsService(req.user.id);

    return res.status(200).json({message: "Appointments retrieved successfully.",appointments});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await getDoctorAppointmentsService(req.user.id);

    return res.status(200).json({message: "Appointments retrieved successfully.",appointments});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await updateAppointmentStatusService(
      req.user.id,
      req.params.id,
      status
    );

    return res.status(200).json({message: "Appointment status updated successfully.",appointment});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await cancelAppointmentService(
      req.user.id,
      req.params.id
    );

    res.status(200).json({message: "Appointment cancelled successfully.",appointment});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const appointment = await rescheduleAppointmentService(
      req.user.id,
      req.params.id,
      req.body.appointmentDate
    );

    res.status(200).json({
      message: "Appointment rescheduled successfully.",
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const filterAppointmentsByStatus = async (req, res) => {
  try {
    const appointments =await filterAppointmentsByStatusService(
        req.user.id,
        req.user.role,
        req.params.status
      );
      res.status(200).json(appointments);
  } catch (error) {res.status(400).json({message: error.message})}
};

export const filterAppointmentsByDate = async (req, res) => {
  try {
    const appointments =await filterAppointmentsByDateService(
        req.user.id,
        req.user.role,
        req.params.date
      );
       res.status(200).json(appointments);
      } catch (error) {res.status(400).json({message: error.message});}
};

export const filterAppointmentsByDoctor = async (req, res) => {

  try {
    const appointments =await filterAppointmentsByDoctorService(req.params.doctorId);
    res.status(200).json(appointments);
  } catch (error) {res.status(400).json({message: error.message});
}
};

export const filterAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await filterAppointmentsByPatientService(req.params.patientId);
    res.status(200).json(appointments);
  } catch (error) {res.status(400).json({message: error.message})}
};