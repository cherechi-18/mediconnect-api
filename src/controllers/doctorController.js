import {createDoctorProfileService,getDoctorProfileService,updateDoctorProfileService} from "../services/doctorService.js";

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

    const doctor = await createDoctorProfileService(
      req.user.id,
      specialization,
      licenseNumber,
      practiceStartDate,
      consultationFee,
      hospital,
      bio,
      availability
    );

    return res.status(201).json({message: "Doctor profile created successfully.",doctor});
  } catch (error) {
    return res.status(500).json({message: "Failed to create doctor profile.",error: error.message});
  }
};
export const getDoctorProfile = async (req, res) => {
  try {
    const result = await getDoctorProfileService(req.user.id);
    if(!result){
      return res.status(404).json({message:"Doctor Profile not found."})
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "Failed to retrieve doctor profile.",error: error.message});
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await updateDoctorProfileService(req.user.id,req.body);
    if(!doctor){
      return res.status(404).json({message:"Doctor Profile not found."})
    }
    return res.status(200).json({message: "Doctor profile updated successfully.",doctor});
  } catch (error) {
    return res.status(500).json({message: "Failed to update doctor profile.",error: error.message});
  }
};