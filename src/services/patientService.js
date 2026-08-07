import PatientProfile from "../models/PatientProfile.js";

export const createPatientProfileService = async (
  userId,
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
) => {const patient = await PatientProfile.create({
    user: userId,
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
  return patient;
};

export const getPatientProfileService = async (userId) => {
  const patient = await PatientProfile.findOne({user: userId});
  return patient;
};

export const updatePatientProfileService = async (userId, updates) => {
  const allowedUpdates = {
    phoneNumber: updates.phoneNumber,
    address: updates.address,
    allergies: updates.allergies,
    medicalHistory: updates.medicalHistory,
    emergencyContact: updates.emergencyContact,
    profilePicture: updates.profilePicture,
  };
  const updatedPatient = await PatientProfile.findOneAndUpdate(
    { user: userId },
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedPatient;
};