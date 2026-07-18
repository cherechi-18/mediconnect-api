import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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