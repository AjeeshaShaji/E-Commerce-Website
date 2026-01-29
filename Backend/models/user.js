import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,

  fullName: String,
  gender: String,
  phone: String,

  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },

  role: { type: String, default: "user" }
});

export default mongoose.model("User", userSchema);
