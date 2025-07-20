import mongoose from "moongose";

//if not exported it won't make the schema
// data modeling

const userSchema = new mongoose.Schema(
  {
    username: {
      typeof: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      typeof: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      typeof: String,
      required: true, // [true, "password is required"]
    },
    isActive: Boolean,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

// it will make the prural in mongodb and become lowercase for eg USER will be as users
