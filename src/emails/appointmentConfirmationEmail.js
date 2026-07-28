export const appointmentConfirmationEmail = (
  firstName,
  doctorName,
  appointmentDate
) => {
  return {
    subject: "Appointment Booked Successfully",
    html: `
      <h1>Appointment Confirmed</h1>

      <p>Hello ${firstName},</p>

      <p>Your appointment has been booked successfully.</p>

      <p><strong>Doctor:</strong> Dr. ${doctorName}</p>

      <p><strong>Date:</strong> ${appointmentDate}</p>

      <p>Please arrive at least 15 minutes before your scheduled appointment.</p>

      <p>Thank you for choosing MediConnect.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};