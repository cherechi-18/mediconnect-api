import DoctorProfile from "../models/DoctorProfile.js";

export const createDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      licenseNumber,
      practiceStartDate,
      consultationFee,
      hospital,
      bio,
      availability,
    } = req.body;

    const doctor = await DoctorProfile.create({
      user: req.user.id,
      specialization,
      licenseNumber,
      practiceStartDate,
      consultationFee,
      hospital,
      bio,
      availability,
    });

    return res.status(201).json({
      message: "Doctor profile created successfully.",doctor});
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create doctor profile.",error: error.message});
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await DoctorProfile.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found.",
      });
    }

    const currentYear = new Date().getFullYear();
    const startYear = new Date(doctor.practiceStartDate).getFullYear();

    const yearsOfExperience = currentYear - startYear;

    return res.status(200).json({doctor,yearsOfExperience});
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve doctor profile.",
      error: error.message,
    });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      consultationFee,
      hospital,
      bio,
      availability,
    } = req.body;

    const updates = {
      specialization,
      consultationFee,
      hospital,
      bio,
      availability,
    };

    const updatedDoctor = await DoctorProfile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        message: "Doctor profile not found.",
      });
    }

    return res.status(200).json({
      message: "Doctor profile updated successfully.",
      doctor: updatedDoctor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update doctor profile.",
      error: error.message,
    });
  }
};