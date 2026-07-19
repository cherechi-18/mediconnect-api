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

    export const getPatientProfile = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({user: req.user.id});

    if (!patient) {
      return res.status(404).json({message: "Patient profile not found."});
    }

    return res.status(200).json({patient});
  } catch (error) {
    return res.status(500).json({message: "Failed to retrieve patient profile.",
      error: error.message,
    });
  }
};

export const updatePatientProfile = async (req, res) => {
  try {
    const {
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
        } = req.body;

        const updates = {
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            allergies,
            medicalHistory,
            bloodGroup,
            genotype,
            emergencyContact,
            profilePicture};


    const updatedPatient = await PatientProfile.findOneAndUpdate(
      { user: req.user.id },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({message: "Patient profile not found."});
    }

    return res.status(200).json({message: "Patient profile updated successfully.",
      patient: updatedPatient
    });
  } catch (error) {
    return res.status(500).json({message: "Failed to update patient profile.",
      error: error.message
    });
  }
};