import dotenv from "dotenv";  dotenv.config();
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

transporter.verify()
  .then(() => console.log("[email] SMTP connection verified"))
  .catch((err) => console.error("[email] SMTP verification failed:", err.message));

export default transporter;

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};