import { bookAppointmentService,getMyAppointmentsService } from "../services/appointmentService.js";

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