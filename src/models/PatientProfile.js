import mongoose from "mongoose";
const patientProfileSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    allergies: {
        type: [String],
        default: []
    },
    medicalHistory: {
        type: [String],
        default: []

    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    genotype: {
         type: String,
         required: true,
         enum: ["AA", "AS", "SS", "AC", "SC"]
        },
        emergencyContact: {
            type: String,
            required: true,
            trim: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        },
        {
            timestamps: true,
        }
    );

    export default mongoose.model("PatientProfile", patientProfileSchema)