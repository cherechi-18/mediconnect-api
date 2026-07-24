import {createPatientProfileService,getPatientProfileService,updatePatientProfileService} from "../services/patientService.js";

export const createPatientProfile = async (req, res) => {
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
      profilePicture,
    } = req.body;

    const patient = await createPatientProfileService(
      req.user.id,
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
    );

    return res.status(201).json({message: "Patient profile created successfully.",patient});
  } catch (error) {
    return res.status(500).json({message: "Failed to create Patient Profile.",error: error.message});
  }
};

export const getPatientProfile = async (req, res) => {
  try {
    const patient = await getPatientProfileService(req.user.id);

    if (!patient) {
      return res.status(404).json({message: "Patient profile not found."});
    }
    return res.status(200).json({patient});
  } catch (error) {
    return res.status(500).json({message: "Failed to retrieve patient profile.",error: error.message});
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
      profilePicture,
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
      profilePicture,
    };

    const updatedPatient = await updatePatientProfileService(
      req.user.id,
      updates
    );

    if (!updatedPatient) {
      return res.status(404).json({message: "Patient profile not found."});
    }
    return res.status(200).json({message: "Patient profile updated successfully.",patient: updatedPatient});
  } catch (error) {
    return res.status(500).json({message: "Failed to update patient profile.",error: error.message});
  }
};