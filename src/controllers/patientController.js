import PatientProfile from "../models/PatientProfile.js";

export const createPatientProfile = async (req, res) => {
    try {

        const{
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            allergies,
            medicalHistory,
            bloodGroup,
            genotype,
            emergencyContact,
            profilePicture
        } = req.body

        const patient = await PatientProfile.create({
            user:req.user.id,
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            allergies,
            medicalHistory,
            bloodGroup,
            genotype,
            emergencyContact,
            profilePicture
        
        });
        return res.status(201).json({message: "Patient profile created successfully.",
            patient
        });

    } catch (error) {
res.status(500).json({message: "Failed to create Patient Profile.",
    error: error.message});
    }
    };
