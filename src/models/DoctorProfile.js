import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    practiceStartDate: {
      type: Date,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    hospital: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);