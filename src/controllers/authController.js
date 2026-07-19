import { registerService,loginService } from "../services/authService.js";
export const registerUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await registerService(userData);
        const { firstName, lastName, email, role } = user; // Destructure the user object to get the required fields
        res.status(201).json({message: "Account created successfully.",
            user: {
                firstName,
                lastName,
                email,
                role }
        });

    } catch (error) {
        res.status(500).json({message: "Server error",error: error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const credentials = req.body;
        
        const data = await loginService(credentials);

        res.status(200).json({message: "Login successful", ...data});
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
};

export const doctorDashboard = (req,res) => {
     res.status(200).json({message: "Welcome Doctor!"})
};

export const adminDashboard = (req,res) => {
     res.status(200).json({message: "Welcome Admin!"})
};

export const getMe = (req, res) => {
    res.status(200).json({message: "Access granted.",
        user: req.user,
    });
};