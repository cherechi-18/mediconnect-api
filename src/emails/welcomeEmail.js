export const welcomeEmail = (firstName) => {
  return {
    subject: "Welcome to MediConnect",
    html: `
      <h1>Welcome to MediConnect, ${firstName}!</h1>

      <p>Your account has been created successfully.</p>

      <p>We're excited to have you join our healthcare platform.</p>

      <p>You can now:</p>

      <ul>
        <li>Book appointments</li>
        <li>Manage your profile</li>
        <li>Connect with healthcare professionals</li>
      </ul>

      <p>Thank you for choosing MediConnect.</p>

      <p><strong>The MediConnect Team</strong></p>
    `,
  };
};