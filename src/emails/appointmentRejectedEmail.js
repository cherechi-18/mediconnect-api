export const appointmentRejectedEmail = (
  firstName,
  doctorName,
  appointmentDate
) => {
  return {
    subject: "Appointment Request Rejected",
    html: `
      <h2>Appointment Request Rejected</h2>

      <p>Hello ${firstName},</p>

      <p>We regret to inform you that your appointment request has been declined.</p>

      <p><strong>Doctor:</strong> Dr. ${doctorName}</p>

      <p><strong>Date:</strong> ${appointmentDate}</p>

      <p>Please log in to MediConnect to book another appointment at a different time.</p>

      <p>Thank you for choosing MediConnect.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};