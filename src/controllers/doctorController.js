import {createDoctorProfileService,getDoctorProfileService,updateDoctorProfileService} from "../services/doctorService.js";

export const createDoctorProfile = async (req, res) => {
  try {
    const doctor = await createDoctorProfileService(req.user.id,req.body);
    return res.status(201).json({message: "Doctor profile created successfully.",doctor});
  } catch (error) {
    return res.status(500).json({message: "Failed to create doctor profile.",error: error.message});
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const result = await getDoctorProfileService(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "Failed to retrieve doctor profile.",error: error.message});
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await updateDoctorProfileService(req.user.id,req.body);

    return res.status(200).json({message: "Doctor profile updated successfully.",doctor});
  } catch (error) {
    return res.status(500).json({message: "Failed to update doctor profile.",error: error.message});
  }
};