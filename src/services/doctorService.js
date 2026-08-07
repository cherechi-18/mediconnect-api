import DoctorProfile from "../models/DoctorProfile.js";

export const createDoctorProfileService = async (
  userId,
  specialization,
  licenseNumber,
  practiceStartDate,
  consultationFee,
  hospital,
  bio,
  availability
) => {
  const doctor = await DoctorProfile.create({
    user: userId,
    specialization,
    licenseNumber,
    practiceStartDate,
    consultationFee,
    hospital,
    bio,
    availability,
  });
  return doctor;
};

export const getDoctorProfileService = async (userId) => {

  const doctor = await DoctorProfile.findOne({
    user: userId,
  });

  if (!doctor) {return null}

  const currentYear = new Date().getFullYear();
  const startYear = new Date(doctor.practiceStartDate).getFullYear();

  const yearsOfExperience = currentYear - startYear;

  return {doctor,yearsOfExperience};
};

export const updateDoctorProfileService = async (userId, updates) => {
  const allowedUpdates = {
    specialization: updates.specialization,
    practiceStartDate: updates.practiceStartDate,
    consultationFee: updates.consultationFee,
    hospital: updates.hospital,
    bio: updates.bio,
    availability: updates.availability,
  };
  const updatedDoctor = await DoctorProfile.findOneAndUpdate(
    { user: userId },
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedDoctor;
};