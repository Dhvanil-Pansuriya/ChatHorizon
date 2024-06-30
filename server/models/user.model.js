import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
    },
    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
