import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },

    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    specialisation: [{ type: String }],
  },
  { timestamps: true }
);

export const Hospital = mongoose.model("Hospital", HospitalSchema);
