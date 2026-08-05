export const passwordResetEmail = (firstName, resetLink) => {
  return {
    subject: "Reset Your MediConnect Password",
    html: `
      <h2>Password Reset Request</h2>

      <p>Hello ${firstName},</p>

      <p>We received a request to reset your password.</p>

      <p>
        Click the link below to reset your password:
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>
        If you didn't request this, please ignore this email.
      </p>

      <p>This link will expire shortly.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};