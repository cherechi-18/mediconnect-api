export const appointmentApprovedEmail = (
  firstName,
  doctorName,
  appointmentDate
) => {
  return {
    subject: "Appointment Approved",
    html: `
      <h1>Your Appointment Has Been Approved</h1>

      <p>Hello ${firstName},</p>

      <p>Good news! Your appointment request has been approved.</p>

      <p><strong>Doctor:</strong> Dr. ${doctorName}</p>

      <p><strong>Date:</strong> ${appointmentDate}</p>

      <p>We look forward to seeing you at the scheduled time.</p>

      <p>Thank you for choosing MediConnect.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};