export const appointmentCancellationEmail = (
  firstName,
  doctorName,
  appointmentDate
) => {
  return {
    subject: "Appointment Cancelled",

    html: `
      <h2>Appointment Cancelled</h2>

      <p>Hello ${firstName},</p>

      <p>Your appointment with <strong>Dr. ${doctorName}</strong> scheduled for
      <strong>${new Date(appointmentDate).toLocaleString()}</strong>
      has been cancelled.</p>

      <p>If this was a mistake, you can book another appointment from your MediConnect account.</p>

      <p>Thank you for choosing MediConnect.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};