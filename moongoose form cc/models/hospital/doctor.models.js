import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    qualitfications: {
      type: String,
      required: true,
    },
    experienceInYear: {
      type: Number,
      reuqired: true,
      default: 0,
    },
    worksInHospitals: [
      {
        type: [
          {
            HospitalId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Hospital",
              required: true,
            },
            Hours: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
