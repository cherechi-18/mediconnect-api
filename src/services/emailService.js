import dotenv from "dotenv"; dotenv.config();
import axios from "axios";

export const sendEmail = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://mailserver.automationlounge.com/api/v1/messages/send",
      {
        to,
        subject,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_MAIL_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Email sending failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};