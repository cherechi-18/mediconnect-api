import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {sendEmail} from "./emailService.js";
import {welcomeEmail} from "../emails/welcomeEmail.js";
import {passwordResetEmail} from "../emails/passwordResetEmail.js";

export const registerService = async (userData) => {

    const { firstName, lastName, email, password, role } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userData.password = hashedPassword;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
    });
    user.password = undefined; // Exclude password from the returned user object

    const firstEmail = welcomeEmail(user.firstName);
    await sendEmail(
        user.email,
        firstEmail.subject,
        firstEmail.html
    );
    return user; 
};

export const loginService = async (credentials) => {
    const { email, password } = credentials;
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user._id,role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    user.password = undefined; // Exclude password from the returned user object
    return { token, user };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("No account found with this email.");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");

// Save the token and its expiry 
user.passwordResetToken = resetToken;
user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
await user.save();

const resetUrl = `${process.env.SERVER_URL}/api/auth/reset-password?token=${resetToken}`;
  const resetPasswordEmail = passwordResetEmail(user.firstName,resetUrl);
  await sendEmail(
      user.email,
      resetPasswordEmail.subject,
      resetPasswordEmail.html
    );
    return {message: "Password reset email sent successfully."};
    };

    export const resetPasswordService = async (token, newPassword) => {
        const user = await User.findOne({
             passwordResetToken: token,
             passwordResetExpires: { $gt: Date.now() }
            });

  if (!user) {throw new Error("Invalid or expired reset token.")}

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return {message: "Password reset successfully."};
};